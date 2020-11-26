import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";
import store from "store2";

import {
    IAction,
    getObjectContextFromObjects,
    executeMicroflow,
    executeNanoflow,
    fetchByXpath,
    getObjects,
    ValidationMessage,
    getObject,
    commitObject,
    createObject,
    OpenPageAs,
    entityIsPersistable,
    executeAction
} from "@jeltemx/mendix-react-widget-utils";

import { NodeStore, NodeStoreConstructorOptions } from "./store";
import {
    MxTreeTableContainerProps,
    Nanoflow,
    TreeviewColumnProps,
    SelectActionButtonProps,
    ClickOptions,
    InlineActionButtonAction
} from "../typings/MxTreeTableProps";
import { ExtraMXValidateProps, validateProps } from "./util/validation";
import { getColumns, TreeColumnProps, TableRecord, getInlineActionButtons } from "./util/columns";
import { createCamelcaseId } from "./util";
import { ButtonBarButtonProps, ButtonBar } from "./components/ButtonBar";
import { Alerts } from "./components/Alert";
import { TreeTable } from "./components/TreeTable";
import { TreeRowObject } from "./store/objects/row";
import { getReferencePart } from "./util/index";
import { TableState } from "./store/index";
import { ColumnProps } from "antd/es/table";

export interface Action extends IAction {}
export type ActionReturn = null | string | number | boolean | mendix.lib.MxObject | mendix.lib.MxObject[] | void;
export interface TransformNanoflows {
    [key: string]: Nanoflow;
}

@observer
class MxTreeTable extends Component<MxTreeTableContainerProps> {
    private store: NodeStore;
    private widgetId?: string;

    private referenceAttr: string;
    private hasChildAttr: string;
    private columnLoadTimeout: number | null = null;
    private helperNodeReference: string;
    private helperContextReference: string;
    private helperContextEntity: string;
    private staticColumns: boolean;
    private columnPropsValid: boolean;

    private transformNanoflows: TransformNanoflows;

    private debug = this._debug.bind(this);
    private fetchData = this._fetchData.bind(this);
    private reset = this._reset.bind(this);
    private handleData = this._handleData.bind(this);
    private convertMxObjectToRow = this._convertMxObjectToRow.bind(this);
    private resetColumns = this._resetColumnsDebounce.bind(this);
    private getInitialState = this._getInitialState.bind(this);
    private writeTableState = this._writeTableState.bind(this);
    private executeAction = this._executeAction.bind(this);
    private loadChildData = this._loadChildData.bind(this);
    private getObjectKeyPairs = this._getObjectKeyPairs.bind(this);
    private expanderFunction = this._expanderFunction.bind(this);
    private getColumnsFromDatasource = this._getColumnsFromDatasource.bind(this);
    private getButtons = this._getButtons.bind(this);

    constructor(props: MxTreeTableContainerProps) {
        super(props);

        // Set various properties based on props coming from runtime
        this.referenceAttr = props.childMethod === "reference" ? getReferencePart(props.childReference) : "";
        this.hasChildAttr =
            props.childMethod !== "disabled" &&
            props.childMethod !== "reference" &&
            "" === props.childReference &&
            "" !== props.childBoolean
                ? props.childBoolean
                : "";

        this.helperNodeReference = getReferencePart(props.helperNodeReference);
        this.helperContextReference = getReferencePart(props.helperContextReference);
        this.helperContextEntity = getReferencePart(props.helperContextReference, "entity");

        this.staticColumns = props.columnMethod === "static";
        this.columnPropsValid =
            this.staticColumns ||
            (props.columnHeaderEntity !== "" &&
                props.columnHeaderLabelAttribute !== "" &&
                props.columnHeaderAttrAttribute !== "" &&
                props.columnMethod === "microflow" &&
                props.columnHeaderMicroflow !== "");

        // Keep a list of transform nanoflows for titles
        this.transformNanoflows = {};
        if (this.staticColumns) {
            this.setTransFormColumns(props.columnList);
        }

        // Validations
        const extraValidations = this.getMXValidations(props);
        const validationMessages = validateProps(props, extraValidations);

        // Create static columns (if applicable)
        const columns = getColumns(props.columnList, this.staticColumns);

        // Create store
        const storeOpts: NodeStoreConstructorOptions = {
            dataResetOnContextChange: this.props.dataResetOnContextChange,
            calculateInitialParents: this.props.loadScenario === "all",
            rowObjectMxProperties: {
                nodeChildReference: this.referenceAttr,
                hasChildAttr: this.hasChildAttr,
                childIsRootAttr: this.props.nodeIsRootAttr,
                uiRowClassAttr: this.props.uiRowClassAttr,
                uiRowIconPrefix: this.props.uiIconPrefix,
                uiRowIconAttr: this.props.uiRowIconAttr
            },
            expandFirstLevel: this.props.loadScenario === "all" && this.props.uiExpandFirstLevelWholeTree,
            validationMessages,
            validColumns: this.columnPropsValid,
            selectFirstOnSingle: this.props.selectSelectFirstOnSingle && this.props.selectMode === "single",
            columns,
            convertMxObjectToRow: this.convertMxObjectToRow,
            childLoader: this.loadChildData,
            resetColumns: this.resetColumns,
            getInitialTableState: this.getInitialState,
            writeTableState: this.writeTableState,
            onSelect: this.onSelectAction.bind(this),
            selectionMode: this.props.selectMode,
            // TODO make this a check if you can reset state!
            resetState: true,
            reset: this.reset,
            debug: this.debug
        };

        this.store = new NodeStore(storeOpts);

        // @ts-ignore
        window._STORE = this.store;
    }

    // **********************
    // DEFAULT REACT METHODS
    // **********************

    componentDidUpdate(): void {
        if (this.widgetId) {
            const domNode = findDOMNode(this);
            // @ts-ignore
            domNode.setAttribute("widgetId", this.widgetId);
        }
    }

    componentWillReceiveProps(nextProps: MxTreeTableContainerProps): void {
        if (!this.widgetId) {
            const domNode = findDOMNode(this);
            // @ts-ignore
            this.widgetId = domNode.getAttribute("widgetId") || undefined;
        }

        if (nextProps.experimentalExposeSetSelected && this.store.contextObject) {
            const guid = this.store.contextObject.getGuid();
            // @ts-ignore
            if (typeof window[`__TreeTable_${guid}_select`] !== "undefined") {
                // @ts-ignore
                delete window[`__TreeTable_${guid}_select`];
            }
        }

        this.store.setContext(nextProps.mxObject);
        this.store.resetSubscriptions("MxTreeTable componentReceiveProps");

        if (nextProps.experimentalExposeSetSelected && nextProps.mxObject) {
            const guid = nextProps.mxObject.getGuid();
            // @ts-ignore
            window[`__TreeTable_${guid}_select`] = this.store.setSelectedFromExternal.bind(this.store);
        }

        if (nextProps.mxObject) {
            this.store.setLoading(true);
            if (!this.staticColumns && this.columnPropsValid) {
                this.getColumnsFromDatasource(nextProps.mxObject).then(() => this.fetchData(nextProps.mxObject));
            } else {
                this.fetchData(nextProps.mxObject);
            }
        } else {
            this.store.setLoading(false);
        }
    }

    componentWillUnmount(): void {
        this.store.clearSubscriptions();
    }

    render(): ReactNode {
        const {
            uiShowHeader,
            selectMode,
            selectActionButtons,
            selectClickSelect,
            selectHideCheckboxes,
            selectOnChangeAction
        } = this.props;
        const { validationMessages, removeValidationMessage } = this.store;
        const fatalValidations = validationMessages.filter(m => m.fatal);

        const buttonBar = this.getButtons(selectActionButtons);

        let selectionMode = selectMode;
        if (
            selectMode !== "none" &&
            buttonBar === null &&
            !(selectClickSelect && selectMode === "single") &&
            selectOnChangeAction === "nothing"
        ) {
            selectionMode = "none";
        }

        if (fatalValidations.length > 0) {
            return (
                <div className={"widget-treetable-alert"}>
                    <Alerts validationMessages={fatalValidations} remove={removeValidationMessage} />
                </div>
            );
        }

        return createElement(TreeTable, {
            store: this.store,
            className: this.props.class,
            expanderFunc: this.expanderFunction,
            onClick: this._onClick.bind(this),
            onDblClick: this._onDblClick.bind(this),
            showHeader: uiShowHeader,
            selectMode: selectionMode,
            onSelect: this.onSelect.bind(this),
            getInlineActionButtons: this._getInlineButtonColumns.bind(this),
            buttonBar,
            clickToSelect: selectClickSelect,
            hideSelectBoxes: selectHideCheckboxes,
            renderExpandButton: this.props.loadScenario === "all" && this.props.uiRenderExpandButton
        });
    }

    // **********************
    // COLUMNS
    // **********************

    private async _getColumnsFromDatasource(mxObject?: mendix.lib.MxObject): Promise<void> {
        if (!mxObject) {
            return;
        }
        this.debug("getColumnsFromDatasource");

        const {
            nodeEntity,
            columnMethod,
            columnHeaderMicroflow,
            // columnHeaderNanoflow,
            columnHeaderAttrAttribute,
            columnHeaderLabelAttribute,
            columnHeaderClassAttribute
        } = this.props;

        const action: Action = {};

        if (columnMethod === "microflow" && columnHeaderMicroflow) {
            action.microflow = columnHeaderMicroflow;
        } else {
            // TODO Alert that something is wrong;
            return;
        }

        const headerObjects = (await this.executeAction(action, true, mxObject)) as mendix.lib.MxObject[];

        if (headerObjects && headerObjects.length > 0) {
            const nodeMetaEntity = window.mx.meta.getEntity(nodeEntity);
            const columns: TreeColumnProps[] = [];

            headerObjects.forEach(obj => {
                const headerAttribute = obj.get(columnHeaderAttrAttribute);
                if (typeof headerAttribute === "string" && headerAttribute && nodeMetaEntity.has(headerAttribute)) {
                    const headerProps: TreeColumnProps = {
                        id: createCamelcaseId(headerAttribute),
                        originalAttr: headerAttribute,
                        label: obj.get(columnHeaderLabelAttribute) as string,
                        guid: obj.getGuid(),
                        width: null,
                        transFromNanoflow: null
                    };
                    if (typeof columnHeaderClassAttribute === "string" && columnHeaderClassAttribute) {
                        headerProps.className = obj.get(columnHeaderClassAttribute) as string;
                    }
                    columns.push(headerProps);
                }
            });

            this.store.setColumns(columns);
            this.store.setValidColumns(true);
        } else {
            this.store.setValidColumns(false);
            this.store.addValidationMessage(new ValidationMessage("No dynamic columns loaded, not showing table"));
        }

        this.store.setSelectFirstOnSingle(this.props.selectSelectFirstOnSingle && this.props.selectMode === "single");
    }

    // **********************
    // DATA
    // **********************

    private async _fetchData(mxObject?: mendix.lib.MxObject): Promise<void> {
        this.debug("fetchData", mxObject ? mxObject.getGuid() : null, this.props.dataSource);
        this.store.setExpanded([], false);
        try {
            let objects: mendix.lib.MxObject[] = [];
            if (this.props.dataSource === "xpath" && this.props.nodeEntity && mxObject) {
                objects = (await fetchByXpath(
                    mxObject,
                    this.props.nodeEntity,
                    this.props.constraint
                )) as mendix.lib.MxObject[];
            } else if (this.props.dataSource === "mf" && this.props.getDataMf) {
                objects = (await this.executeAction(
                    { microflow: this.props.getDataMf },
                    false,
                    mxObject
                )) as mendix.lib.MxObject[];
            } else if (this.props.dataSource === "nf" && this.props.getDataNf && this.props.getDataNf.nanoflow) {
                objects = (await this.executeAction(
                    { nanoflow: this.props.getDataNf },
                    false,
                    mxObject
                )) as mendix.lib.MxObject[];
            } else {
                this.store.setLoading(false);
            }

            if (objects !== null) {
                this.handleData(objects, null, -1);
            } else {
                this.handleData([], null, -1);
            }
        } catch (error) {
            window.mx.ui.error("An error occurred while executing retrieving data: ", error);
        }
    }

    private async _handleData(
        objects: mendix.lib.MxObject[],
        parentKey?: string | null,
        level?: number
    ): Promise<void> {
        this.debug("handleData", objects.length, parentKey, level);

        try {
            this.store.setRowObjects(objects, level, parentKey);
            this.store.setLoading(false);
        } catch (error) {
            window.mx.ui.error("An error occurred while handling data: ", error);
        }
    }

    private async _loadChildData(guids: string[], parentKey: string, loadFromRef: boolean): Promise<void> {
        this.debug("loadChildData", guids, parentKey, loadFromRef);
        try {
            if (loadFromRef) {
                const objects = await getObjects(guids);
                if (objects) {
                    this.handleData(objects, parentKey);
                }
            } else {
                const rowObject = this.store.findRowObject(parentKey);
                if (rowObject) {
                    const treeObj = rowObject.treeObject;
                    this._expanderFunction(treeObj, 1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async _convertMxObjectToRow(mxObject: mendix.lib.MxObject): Promise<TreeRowObject> {
        const keyPairValues = await this.getObjectKeyPairs(mxObject);

        const retObj: TreeRowObject = {
            key: mxObject.getGuid(),
            ...keyPairValues
        };

        return retObj;
    }

    private _getObjectKeyPairs(
        obj: mendix.lib.MxObject
    ): Promise<{ [key: string]: string | number | boolean | ReactNode }> {
        const { columns } = this.store;
        return Promise.all(
            columns
                .filter(col => col.transFromNanoflow && col.transFromNanoflow.nanoflow)
                .map(async (col: TreeColumnProps) => {
                    let returnValue: { id?: string; value?: string } = {};
                    if (col.transFromNanoflow) {
                        const formatted = (await this.executeAction(
                            { nanoflow: col.transFromNanoflow },
                            true,
                            obj
                        )) as string;
                        returnValue = { id: col.id, value: formatted };
                    }
                    return returnValue;
                })
        ).then(objects => {
            const retVal: { [key: string]: string | number | boolean | ReactNode } = {};

            objects.forEach(obj => {
                if (obj.id) {
                    retVal[obj.id] = obj.value;
                }
            });

            return retVal;
        });
    }

    private async _expanderFunction(record: TableRecord | TreeRowObject, level: number): Promise<void> {
        this.debug("expanderFunction", record, level);
        try {
            if (typeof record._mxReferences !== "undefined" && record._mxReferences.length > 0) {
                this.store.setLoading(true);
                const guids = record._mxReferences as string[];
                const mxRowObjects = await getObjects(guids);
                if (mxRowObjects) {
                    this.handleData(mxRowObjects, record.key, level);
                }
                this.store.setLoading(false);
            } else if (record._mxHasChildren && record.key) {
                const mxNodeObject = await getObject(record.key);
                if (!mxNodeObject) {
                    return;
                }
                const action: Action = {};

                if (this.props.childMethod === "microflow" && this.props.getChildMf) {
                    action.microflow = this.props.getChildMf;
                } else if (
                    this.props.childMethod === "nanoflow" &&
                    this.props.getChildNf &&
                    this.props.getChildNf.nanoflow
                ) {
                    action.nanoflow = this.props.getChildNf;
                }

                if (action.microflow || action.nanoflow) {
                    this.store.setLoading(true);
                    const mxObjects = (await this.executeAction(action, true, mxNodeObject)) as mendix.lib.MxObject[];
                    this.handleData(mxObjects, record.key, level);
                    this.store.setLoading(false);
                }
            }
        } catch (error) {
            mx.ui.error(`An error occurred while retrieving child items for ${record.key}: ${error}`);
            this.store.setLoading(false);
        }
    }

    // **********************
    // BUTTONS
    // **********************

    private _getButtons(actionButtons: SelectActionButtonProps[]): ReactNode {
        const selectedObjects = this.store.selectedRows;
        const filteredButtons = actionButtons
            .filter(
                button =>
                    button.selectABLabel &&
                    (button.selectABMicroflow || (button.selectABNanoflow && button.selectABNanoflow.nanoflow))
            )
            .map(button => {
                const { selectABAction, selectABMicroflow, selectABNanoflow } = button;

                const disabled = !(selectedObjects && selectedObjects.length > 0);

                const buttonProp: ButtonBarButtonProps = {
                    caption: button.selectABLabel,
                    disabled,
                    hidden: button.selectABHideOnNotApplicable && disabled,
                    onClick: async () => {
                        const selectedObjects = this.store.selectedRows;

                        if (selectedObjects.length > 0) {
                            const selection = await getObjects(selectedObjects);
                            if (!selection) {
                                return;
                            }

                            if (selectABAction === "mf" && selectABMicroflow) {
                                this.selectionAction(selection, selectABMicroflow, null);
                            } else if (selectABAction === "nf" && selectABNanoflow) {
                                this.selectionAction(selection, null, selectABNanoflow);
                            }
                        }
                    }
                };

                if (button.selectABClass) {
                    buttonProp.className = button.selectABClass;
                }

                return buttonProp;
            });
        if (filteredButtons.length === 0) {
            return null;
        }
        return createElement(ButtonBar, {
            className: "widget-treetable-buttonbar",
            buttons: filteredButtons
        });
    }

    private _getInlineButtonColumns(): Array<ColumnProps<TableRecord>> {
        return getInlineActionButtons(
            this.props.inlineActionButtons,
            (
                record: TableRecord,
                action: InlineActionButtonAction,
                microflow: string,
                nanoflow: Nanoflow,
                form: string,
                formOpenAs: OpenPageAs
            ): void => {
                this._onClickHandler(record, action as ClickOptions, microflow, nanoflow, form, formOpenAs);
            }
        );
    }

    // **********************
    // VALIDATIONS
    // **********************

    private getMXValidations(props: MxTreeTableContainerProps): ExtraMXValidateProps {
        const extraProps: ExtraMXValidateProps = {};
        const { helperEntity } = props;

        if (helperEntity !== "") {
            extraProps.helperObjectPersistence = entityIsPersistable(helperEntity);
        }

        return extraProps;
    }

    // **********************
    // CLICK ACTIONS
    // **********************

    private async _onClick(record: TableRecord): Promise<void> {
        // this.debug("click: ", record);
        const { onClickAction, onClickMf, onClickNf, onClickForm, onClickOpenPageAs } = this.props;
        this._onClickHandler(record, onClickAction, onClickMf, onClickNf, onClickForm, onClickOpenPageAs);
    }

    private async _onDblClick(record: TableRecord): Promise<void> {
        // this.debug("dblClick: ", record);
        const { onDblClickAction, onDblClickMf, onDblClickNf, onDblClickForm, onDblClickOpenPageAs } = this.props;
        this._onClickHandler(
            record,
            onDblClickAction,
            onDblClickMf,
            onDblClickNf,
            onDblClickForm,
            onDblClickOpenPageAs
        );
    }

    private async _onClickHandler(
        record: TableRecord,
        action: ClickOptions,
        microflow: string,
        nanoflow: Nanoflow,
        form: string,
        formOpenAs: OpenPageAs
    ): Promise<void> {
        if (record && record.key) {
            if (action === "open" && form) {
                const nodeObject = await getObject(record.key);
                if (!nodeObject) {
                    return;
                }
                this.executeAction({ page: { pageName: form, openAs: formOpenAs } }, false, nodeObject);
            } else if (action === "mf" && microflow) {
                this.clickAction(record.key, microflow, null);
            } else if (action === "nf" && nanoflow && nanoflow.nanoflow) {
                this.clickAction(record.key, null, nanoflow);
            }
        }
    }

    private async clickAction(selectedGuid: string, mf: string | null, nf: Nanoflow | null): Promise<void> {
        const nodeObject = await getObject(selectedGuid);
        if (!nodeObject) {
            return;
        }

        const helperObject = await this.createHelperObject([nodeObject]);
        if (!helperObject) {
            return;
        }
        const context = new window.mendix.lib.MxContext();
        context.setContext(helperObject.getEntity(), helperObject.getGuid());

        if (mf !== null) {
            executeMicroflow(mf, context, this.props.mxform, true);
        } else if (nf !== null) {
            executeNanoflow(nf, context, this.props.mxform, true);
        }
    }

    // **********************
    // HELPER OBJECT (CLICK, SELECTION)
    // **********************

    private async createHelperObject(nodeObjects?: mendix.lib.MxObject[]): Promise<mendix.lib.MxObject | null> {
        this.debug("createHelperObject", nodeObjects && nodeObjects.length);
        if (!this.props.helperEntity || !this.helperContextReference || !this.helperNodeReference) {
            window.mx.ui.error("Missing Helper entity and/or references");
            return null;
        }

        const helperObject = await createObject(this.props.helperEntity);

        if (this.props.mxObject) {
            const contextEntity = this.props.mxObject.getEntity();
            if (contextEntity !== this.helperContextEntity) {
                window.mx.ui.error(`Error creating a Helper object.

You are trying to set the reference "${this.helperContextReference}" which expects an object of type "${this.helperContextEntity}".

Your context object is of type "${contextEntity}". Please check the configuration of your widget. (Helper => Reference to context)`);
                return null;
            } else {
                helperObject.addReference(this.helperContextReference, this.props.mxObject.getGuid());
            }
        }

        if (nodeObjects && nodeObjects.length) {
            helperObject.addReferences(
                this.helperNodeReference,
                nodeObjects.map(obj => obj.getGuid())
            );
        }

        // Allthough it's a non-persistent object, we still need to commit it to make sure it's available in the runtime
        await commitObject(helperObject);

        return helperObject;
    }

    // **********************
    // SELECTION
    // **********************

    private async selectionAction(
        objects: mendix.lib.MxObject[],
        mf: string | null,
        nf: Nanoflow | null
    ): Promise<void> {
        const { mxform } = this.props;

        const helperObject = await this.createHelperObject(objects);

        if (helperObject === null) {
            return;
        }

        const context = new window.mendix.lib.MxContext();
        context.setContext(helperObject.getEntity(), helperObject.getGuid());

        if (mf !== null) {
            return executeMicroflow(mf, context, mxform).then(() => {
                this.debug("Action executed");
            });
        } else if (nf !== null) {
            return executeNanoflow(nf, context, mxform).then(() => {
                this.debug("Action executed");
            });
        }
    }

    private onSelect(ids: string[], childChange?: { record: TableRecord; selected: boolean }): void {
        const { selectMode, selectMultiChildren, mxObject } = this.props;

        let selectedIDS = ids;

        if (selectMode === "none") {
            return;
        }
        if (mxObject) {
            let additions: string[] = [];
            let removals: string[] = [];

            if (selectMode === "multi" && selectMultiChildren && childChange) {
                const row = this.store.findRowObject(childChange.record.key);
                if (row) {
                    const children = this.store.findChildren(row);
                    if (children.length > 0) {
                        const ids = children.map(c => c.key);
                        if (childChange.selected) {
                            additions = ids;
                        } else {
                            removals = ids;
                        }
                    }
                }
            }

            try {
                const { selectedRows } = this.store;

                if (additions.length) {
                    selectedIDS = [...selectedIDS, ...additions.filter(a => !selectedIDS.includes(a))];
                }
                if (removals.length) {
                    selectedIDS = selectedIDS.filter(id => !removals.includes(id));
                }

                const unTouched = selectedRows.filter(row => selectedIDS.indexOf(row) !== -1);
                const newIds = selectedIDS.filter(id => selectedRows.indexOf(id) === -1);

                if (selectedIDS.length === 0 || newIds.length === 0) {
                    this.store.setSelected(unTouched);
                    this.onSelectAction();
                } else {
                    getObjects(newIds)
                        .then(newObjects => {
                            const newObjs: mendix.lib.MxObject[] = newObjects || [];
                            this.store.setSelected([...newObjs.map(o => o.getGuid()), ...unTouched]);
                            this.onSelectAction();
                        })
                        .catch(err => {
                            throw err;
                        });
                }
            } catch (error) {
                window.mx.ui.error(`An error occurred while setting selection: ${error.message}`);
            }
        }
    }

    private async onSelectAction(selected?: string[]): Promise<void> {
        const selectedFromStore = this.store.selectedRows;
        const selectedRows = typeof selected !== "undefined" ? selected : selectedFromStore;
        const { selectOnChangeAction, selectOnChangeMicroflow, selectOnChangeNanoflow } = this.props;
        this.debug("onSelectAction", selectedRows.length);

        if (this.store.selectFirstOnSingle) {
            this.store.setSelectFirstOnSingle(false);
        }

        // When we do an onChange selection, chances are that you change the context object. In order to avoid re-rendering the table, we temporarily lift
        // all subscriptions, then do the select Action, then reapply the selections. This can also be avoid by creating a helperSelection object and add this
        // to your view, then changing that helper selection Object instead of the context object
        if (selectOnChangeAction === "mf" && selectOnChangeMicroflow) {
            const selectedObjects = await getObjects(selectedRows);
            if (selectedObjects === null) {
                return;
            }
            this.store.clearSubscriptions();
            await this.selectionAction(selectedObjects, selectOnChangeMicroflow, null);
            this.store.resetSubscriptions("onSelectAction mf");
        } else if (selectOnChangeAction === "nf" && selectOnChangeNanoflow && selectOnChangeNanoflow.nanoflow) {
            const selectedObjects = await getObjects(selectedRows);
            if (selectedObjects === null) {
                return;
            }
            this.store.clearSubscriptions();
            await this.selectionAction(selectedObjects, null, selectOnChangeNanoflow);
            this.store.resetSubscriptions("onSelectAction nf");
        }
    }

    // **********************
    // STATE MANAGEMENT
    // **********************

    private _getInitialState(guid: string): TableState {
        const {
            stateManagementType,
            stateLocalStorageKey,
            stateLocalStorageKeyIncludeGUID,
            stateExecuteSelectActionOnRestore,
            stateLocalStorageType
        } = this.props;
        const key =
            stateLocalStorageKey !== ""
                ? `TreeTableState-${stateLocalStorageKey}${stateLocalStorageKeyIncludeGUID ? `-${guid}` : ""}`
                : `TreeTableState-${guid}`;
        const currentDateTime = +new Date();
        const emptyState: TableState = {
            context: guid,
            expanded: [],
            selected: []
        };
        if (stateManagementType === "disabled" /* || stateManagementType === "mendix"*/) {
            return emptyState;
        }
        const hasLocalStorage = stateLocalStorageType === "session" ? store.session.has(key) : store.local.has(key);

        if (!hasLocalStorage) {
            this.writeTableState(emptyState);
            return emptyState;
        }

        const localStoredState = (stateLocalStorageType === "session"
            ? store.session.get(key)
            : store.local.get(key)) as TableState | null;
        this.debug("getTableState", localStoredState);
        if (
            localStoredState &&
            localStoredState.lastUpdate &&
            currentDateTime - localStoredState.lastUpdate < this.props.stateLocalStorageTime * 1000 * 60
        ) {
            if (
                localStoredState.selected &&
                localStoredState.selected.length > 0 &&
                stateExecuteSelectActionOnRestore
            ) {
                this.onSelectAction(localStoredState.selected);
            }
            return localStoredState;
        }

        this.writeTableState(emptyState);
        return emptyState;
    }

    private _writeTableState(state: TableState): void {
        // We're doing this the dirty way instead of Object.assign because IE11 sucks
        const writeState = JSON.parse(JSON.stringify(state)) as TableState;
        const {
            stateManagementType,
            stateLocalStorageKey,
            stateLocalStorageKeyIncludeGUID,
            stateLocalStorageType
        } = this.props;
        if (stateManagementType === "disabled" /* || stateManagementType === "mendix"*/) {
            return;
        }
        this.debug("writeTableState", writeState);
        const key =
            stateLocalStorageKey !== ""
                ? `TreeTableState-${stateLocalStorageKey}${
                      stateLocalStorageKeyIncludeGUID ? `-${writeState.context}` : ""
                  }`
                : `TreeTableState-${writeState.context}`;
        writeState.lastUpdate = +new Date();
        if (stateLocalStorageType === "session") {
            store.session.set(key, writeState);
        } else {
            store.local.set(key, writeState);
        }
    }

    // **********************
    // OTHER METHODS
    // **********************

    private _resetColumnsDebounce(col: string): void {
        if (this.columnLoadTimeout !== null) {
            window.clearTimeout(this.columnLoadTimeout);
        }
        this.store.clearSubscriptions();
        this.columnLoadTimeout = window.setTimeout(() => {
            this.debug("Reset columns ", col);
            this.getColumnsFromDatasource(this.props.mxObject).then(() => {
                this.store.resetSubscriptions("MxTreeTable resetColumnsDebounce");
                this.fetchData(this.props.mxObject);
            });
            this.columnLoadTimeout = null;
        }, 100);
    }

    private _reset(): void {
        if (!this.staticColumns && this.columnPropsValid) {
            this.getColumnsFromDatasource(this.props.mxObject).then(() => {
                this.store.resetSubscriptions("MxTreeTable reset");
                this.fetchData(this.props.mxObject);
            });
        } else {
            this.fetchData(this.props.mxObject);
        }
    }

    private setTransFormColumns(columns: TreeviewColumnProps[]): void {
        this.transformNanoflows = {};
        columns.forEach(column => {
            if (column.transformNanoflow && column.transformNanoflow.nanoflow) {
                this.transformNanoflows[column.columnAttr] = column.transformNanoflow;
            }
        });
    }

    private _executeAction(action: Action, showError = false, obj?: mendix.lib.MxObject): Promise<ActionReturn> {
        this.debug("executeAction", action, obj && obj.getGuid());

        return executeAction(
            action,
            showError,
            getObjectContextFromObjects(obj, this.props.mxObject),
            this.props.mxform
        );
    }

    private _debug(...args: unknown[]): void {
        const id = this.props.friendlyId || this.widgetId;
        if (window.logger) {
            window.logger.debug(`${id}:`, ...args);
        }
    }
}

export default hot(MxTreeTable);
