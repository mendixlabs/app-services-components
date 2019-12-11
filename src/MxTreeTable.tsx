import { Component, ReactNode, createElement } from "react";
import { findDOMNode } from "react-dom";

import clone from "lodash/clone";
import defaults from "lodash/defaults";
import Queue from "promise-queue";
import { executeMicroflow, executeNanoFlow, openPage } from "@jeltemx/mendix-react-widget-utils/lib/actions";
import { getObjects, createObject, commitObject, getObject } from "@jeltemx/mendix-react-widget-utils/lib/objects";

import { createCamelcaseId, fetchAttr } from "./util";
import { validateProps, ExtraMXValidateProps } from "./util/validation";

import { MxTreeTableContainerProps, TreeviewColumnProps, ActionButtonProps } from "../typings/MxTreeTableProps";
import { TreeTable, RowObject, TableRecord, TreeColumnProps } from "./components/TreeTable";
import { Alert } from "./components/Alert";
import { ButtonBarButtonProps, ButtonBar } from "./components/ButtonBar";

interface MxTreeTableState {
    alertMessage: string | string[];
    isLoading: boolean;
    validColumns: boolean;
    columnGuids: string[];
    columns: TreeColumnProps[];
    rows: RowObject[];
    selectedObjects: mendix.lib.MxObject[];
    selectFirstOnSingle: boolean;
    lastLoadFromContext: number;
}

export interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface NodeObject {
    obj?: mendix.lib.MxObject;
    key?: string;
    microflow?: string;
    nanoflow?: Nanoflow;
    openpage?: string;
    openpageas?: "content" | "popup" | "modal" | "node";
}

class MxTreeTable extends Component<MxTreeTableContainerProps, MxTreeTableState> {
    private widgetId?: string;
    private subscriptionHandles: number[] = [];
    private referenceAttr: string;
    private loaderTimeout: number | null;
    private columnLoadTimeout: number | null;
    private hasChildAttr: string;
    private helperNodeReference: string;
    private helperContextReference: string;
    private staticColumns: boolean;
    private columnPropsValid: boolean;
    private queue: Queue;
    private transformNanoflows: {
        [key: string]: Nanoflow;
    };

    constructor(props: MxTreeTableContainerProps) {
        super(props);

        this.referenceAttr =
            props.childMethod === "reference" && "" !== props.childReference ? props.childReference.split("/")[0] : "";
        this.hasChildAttr =
            props.childMethod !== "disabled" &&
            props.childMethod !== "reference" &&
            "" === props.childReference &&
            "" !== props.childBoolean
                ? props.childBoolean
                : "";

        this.helperNodeReference = props.helperNodeReference ? props.helperNodeReference.split("/")[0] : "";
        this.helperContextReference = props.helperContextReference ? props.helperContextReference.split("/")[0] : "";

        this.staticColumns = props.columnMethod === "static";
        this.columnPropsValid =
            this.staticColumns ||
            (props.columnHeaderEntity !== "" &&
                props.columnHeaderLabelAttribute !== "" &&
                props.columnHeaderAttrAttribute !== "" &&
                props.columnMethod === "microflow" &&
                props.columnHeaderMicroflow !== "");

        this.loaderTimeout = null;
        this.columnLoadTimeout = null;
        this.transformNanoflows = {};
        this.subscriptionHandles = [];
        // We're creating a data queue that handles data changes one by one, max 1000 in the queue
        this.queue = new Queue(1, 1000);

        const extraValidations = this.getMXValidations(props);
        const alertMessage = validateProps(props, extraValidations);
        const columns = MxTreeTable.getColumns(props.columnList, this.staticColumns);

        this.state = {
            alertMessage,
            isLoading: true,
            validColumns: !this.staticColumns,
            columnGuids: [],
            columns,
            rows: [],
            selectedObjects: [],
            selectFirstOnSingle: this.props.selectSelectFirstOnSingle && this.props.selectMode === "single",
            lastLoadFromContext: +new Date()
        };

        this.bindMethods();

        if (this.staticColumns) {
            this.setTransFormColumns(props.columnList);
        }
    }

    render(): ReactNode {
        const {
            columns,
            rows,
            isLoading,
            alertMessage,
            validColumns,
            selectFirstOnSingle,
            lastLoadFromContext
        } = this.state;
        const {
            uiShowHeader,
            selectMode,
            selectActionButtons,
            selectClickSelect,
            selectHideCheckboxes,
            selectOnChangeAction
        } = this.props;
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

        if (!validColumns && alertMessage) {
            return createElement(Alert, {
                bootstrapStyle: "warning",
                className: "widget-treetable-alert",
                message: alertMessage
            });
        }
        return createElement(TreeTable, {
            columns,
            rows,
            className: this.props.class,
            alertMessage,
            expanderFunc: this.expanderFunc,
            onClick: this.onClick,
            onDblClick: this.onDblClick,
            showHeader: uiShowHeader,
            selectMode: selectionMode,
            onSelect: this.onSelect,
            loading: isLoading,
            buttonBar,
            clickToSelect: selectClickSelect,
            hideSelectBoxes: selectHideCheckboxes,
            selectFirst: selectFirstOnSingle,
            lastLoadFromContext
        });
    }

    componentWillReceiveProps(nextProps: MxTreeTableContainerProps): void {
        if (!this.widgetId) {
            const domNode = findDOMNode(this);
            // @ts-ignore
            this.widgetId = domNode.getAttribute("widgetId") || undefined;
        }
        this.resetSubscription();
        this.setState({ isLoading: true }, () => {
            if (!this.staticColumns && this.columnPropsValid) {
                this.getColumnsFromDatasource(nextProps.mxObject).then(() => this.fetchData(nextProps.mxObject));
            } else {
                this.fetchData(nextProps.mxObject);
            }
        });
    }

    componentDidUpdate(): void {
        if (this.widgetId) {
            const domNode = findDOMNode(this);
            // @ts-ignore
            domNode.setAttribute("widgetId", this.widgetId);
        }
    }

    componentWillUnmount(): void {
        if (this.subscriptionHandles) {
            this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        }
    }

    private bindMethods(): void {
        this.setLoader = this.setLoader.bind(this);
        this.resetSubscription = this.resetSubscription.bind(this);
        this.clearSubscriptions = this.clearSubscriptions.bind(this);
        this.getColumnsFromDatasource = this.getColumnsFromDatasource.bind(this);

        this.getFormattedValue = this.getFormattedValue.bind(this);
        this.getFormattedOrTransformed = this.getFormattedOrTransformed.bind(this);
        this.getObjectKeyPairs = this.getObjectKeyPairs.bind(this);
        this.executeAction = this.executeAction.bind(this);
        this.setTransFormColumns = this.setTransFormColumns.bind(this);

        this.expanderFunc = this.expanderFunc.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDblClick = this.onDblClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelectAction = this.onSelectAction.bind(this);
        this.selectionAction = this.selectionAction.bind(this);
        this.createHelperObject = this.createHelperObject.bind(this);

        this.debug = this.debug.bind(this);
    }

    private getMXValidations(props: MxTreeTableContainerProps): ExtraMXValidateProps {
        const extraProps: ExtraMXValidateProps = {};
        const { helperEntity } = props;

        if (helperEntity !== "") {
            const entity = window.mx.meta.getEntity(helperEntity);
            extraProps.helperObjectPersistence = entity.isPersistable();
        }

        return extraProps;
    }

    private clearSubscriptions(): void {
        const { unsubscribe } = window.mx.data;

        if (this.subscriptionHandles && this.subscriptionHandles.length > 0) {
            this.subscriptionHandles.forEach(unsubscribe);
            this.subscriptionHandles = [];
        }
    }

    private resetSubscription(): void {
        this.debug("resetSubscriptions");
        const { subscribe } = window.mx.data;
        const { rows } = this.state;

        this.clearSubscriptions();

        if (this.props.mxObject && this.props.mxObject.getGuid) {
            this.subscriptionHandles.push(
                subscribe({
                    callback: () => {
                        this.debug("subscription: context");
                        this.clearSubscriptions();
                        this.fetchData(this.props.mxObject);
                    },
                    guid: this.props.mxObject.getGuid()
                })
            );
        }

        if (rows && rows.length > 0) {
            rows.forEach((row, index) => {
                this.subscriptionHandles.push(
                    subscribe({
                        guid: row.key as string,
                        callback: () => {
                            window.mx.data.get({
                                guid: row.key as string,
                                error: error => {
                                    MxTreeTable.logError(error.message);
                                },
                                callback: (res: mendix.lib.MxObject) => {
                                    this.debug("subcription: row", index, row, res);
                                    // Object might have been removed!
                                    if (res === null) {
                                        // Remove element from rows
                                        const cloned = clone(rows);
                                        cloned.splice(index, 1);

                                        // If we have an object that has been removed, we also need to remove it from our selection
                                        const { selectedObjects } = this.state;
                                        const findSelected = selectedObjects.findIndex(el => el.getGuid() === row.key);
                                        if (findSelected !== -1) {
                                            selectedObjects.splice(findSelected, 1);
                                        }
                                        this.setState(
                                            {
                                                selectedObjects,
                                                rows: cloned
                                            },
                                            this.resetSubscription
                                        );
                                    } else {
                                        this.handleData([res], row._parent);
                                        if (
                                            this.props.childMethod === "microflow" ||
                                            this.props.childMethod === "nanoflow"
                                        ) {
                                            // If object already exists and has children, we will reload all children;
                                            const hasChildren =
                                                rows.filter(findRow => findRow._parent && findRow._parent === row.key)
                                                    .length > 0;
                                            if (hasChildren) {
                                                this.expanderFunc(row, 0);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    })
                );
            });
        }

        if (this.state.columnGuids && this.state.columnGuids.length > 0) {
            this.state.columnGuids.forEach(col => {
                this.subscriptionHandles.push(
                    subscribe({
                        guid: col,
                        callback: () => {
                            this.debug("subscription: column", col);
                            // We're using a timeout, because in our typical projects multiple column subscriptions will be fired in parallel
                            // That can become problematic when waiting for a getMicroflow. So we're debouncing this.
                            if (this.columnLoadTimeout !== null) {
                                window.clearTimeout(this.columnLoadTimeout);
                                // this.columnLoadTimeout = null;
                            }
                            this.clearSubscriptions();
                            this.columnLoadTimeout = window.setTimeout(() => {
                                this.debug("subscription: column executed", col);
                                this.queue.add(() =>
                                    this.getColumnsFromDatasource(this.props.mxObject).then(() =>
                                        this.fetchData(this.props.mxObject)
                                    )
                                );
                                this.columnLoadTimeout = null;
                            }, 100);
                        }
                    })
                );
            });
        }
    }

    private getColumnsFromDatasource(mxObject?: mendix.lib.MxObject): Promise<void> {
        if (!mxObject) {
            return Promise.resolve();
        }

        const {
            columnMethod,
            columnHeaderMicroflow,
            // columnHeaderNanoflow,
            columnHeaderAttrAttribute,
            columnHeaderLabelAttribute,
            columnHeaderClassAttribute
        } = this.props;

        const nodeObj: NodeObject = {
            obj: mxObject
        };

        if (columnMethod === "microflow" && columnHeaderMicroflow) {
            nodeObj.microflow = columnHeaderMicroflow;
            // } else if (columnMethod === "nanoflow" && columnHeaderNanoflow.nanoflow) {
            //     nodeObj.nanoflow = columnHeaderNanoflow;
        } else {
            // TODO: Alert that something is wrong;
            return Promise.resolve();
        }

        return this.executeAction(nodeObj).then((headerObjects: mendix.lib.MxObject[]) => {
            if (headerObjects && headerObjects.length > 0) {
                const nodeEntity = window.mx.meta.getEntity(this.props.nodeEntity);
                const columns: TreeColumnProps[] = [];
                headerObjects.forEach(obj => {
                    const headerAttribute = obj.get(columnHeaderAttrAttribute);
                    // TODO fix the MxMetaObject, should have this method
                    // @ts-ignore
                    if (typeof headerAttribute === "string" && headerAttribute && nodeEntity.has(headerAttribute)) {
                        const headerProps: TreeColumnProps = {
                            id: createCamelcaseId(headerAttribute),
                            originalAttr: headerAttribute,
                            label: obj.get(columnHeaderLabelAttribute) as string,
                            width: null
                        };
                        if (typeof columnHeaderClassAttribute === "string" && columnHeaderClassAttribute) {
                            headerProps.className = obj.get(columnHeaderClassAttribute) as string;
                        }
                        columns.push(headerProps);
                    }
                });
                this.setState({
                    columns,
                    columnGuids: headerObjects.map(obj => obj.getGuid()),
                    validColumns: true,
                    isLoading: false,
                    selectFirstOnSingle: this.props.selectSelectFirstOnSingle && this.props.selectMode === "single"
                });
            } else {
                this.setState({
                    validColumns: false,
                    isLoading: false,
                    alertMessage: "No dynamic columns loaded, not showing table",
                    selectFirstOnSingle: this.props.selectSelectFirstOnSingle && this.props.selectMode === "single"
                });
            }
        });
    }

    private setTransFormColumns(columns: TreeviewColumnProps[]): void {
        this.transformNanoflows = {};
        columns.forEach(column => {
            if (column.transformNanoflow) {
                this.transformNanoflows[column.columnAttr] = column.transformNanoflow;
            }
        });
    }

    private setLoader(loaderState: boolean, callback?: () => void): void {
        if (this.loaderTimeout !== null) {
            clearTimeout(this.loaderTimeout);
            this.loaderTimeout = null;
        }
        if (!loaderState) {
            this.setState(
                {
                    isLoading: false
                },
                callback
            );
        } else {
            this.loaderTimeout = window.setTimeout(() => {
                this.setState({
                    isLoading: true
                });
            }, 300);
            if (callback) {
                callback();
            }
        }
    }

    private fetchData(mxObject?: mendix.lib.MxObject): void {
        if (this.props.dataSource === "xpath" && this.props.nodeEntity && mxObject) {
            this.fetchByXpath(mxObject);
        } else if (this.props.dataSource === "mf" && this.props.getDataMf) {
            this.fetchByMf(this.props.getDataMf, mxObject);
        } else if (this.props.dataSource === "nf" && this.props.getDataNf) {
            this.fetchByNf(this.props.getDataNf, mxObject);
        } else {
            this.setState({ isLoading: false });
        }
    }

    private fetchByXpath(mxObject: mendix.lib.MxObject): void {
        this.debug("fetchByXpath", mxObject);
        const { constraint } = this.props;
        const requiresContext = constraint && constraint.indexOf("[%CurrentObject%]") > -1;
        const contextGuid = mxObject.getGuid();
        if (!contextGuid && requiresContext) {
            this.setState({ isLoading: false });
            return;
        }

        const entityConstraint = constraint ? constraint.replace(/\[%CurrentObject%]/g, contextGuid) : "";

        window.mx.data.get({
            callback: mxObjects => this.handleData(mxObjects, null, -1),
            error: error =>
                this.setState({
                    alertMessage: `An error occurred while retrieving items via XPath (${entityConstraint}): ${error}`
                }),
            xpath: `//${this.props.nodeEntity}${entityConstraint}`
        });
    }

    private fetchByMf(microflow: string, mxObject?: mendix.lib.MxObject): void {
        this.debug("fetchByMf", microflow, mxObject);
        if (microflow) {
            window.mx.data.action({
                callback: (mxObjects: mendix.lib.MxObject[]) => this.handleData(mxObjects, null, -1),
                error: error =>
                    this.setState({
                        alertMessage: `An error occurred while retrieving nodes via the microflow ${microflow}: ${error.message}`
                    }),
                origin: this.props.mxform,
                params: {
                    actionname: microflow,
                    applyto: "selection",
                    guids: mxObject ? [mxObject.getGuid()] : []
                }
            });
        }
    }

    private fetchByNf(nanoflow: Nanoflow, mxObject?: mendix.lib.MxObject): void {
        this.debug("fetchByNf", nanoflow.nanoflow, mxObject);
        const context = this.getContext({ obj: mxObject });
        if (nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow,
                context,
                origin: this.props.mxform,
                callback: (mxObjects: mendix.lib.MxObject[]) => this.handleData(mxObjects, null, -1),
                error: error => {
                    this.setState({
                        alertMessage: `An error occurred while retrieving nodes via the nanoflow ${nanoflow}: ${error.message}`
                    });
                }
            });
        }
    }

    private handleData(objects: mendix.lib.MxObject[], parentKey?: string | null, level?: number): void {
        this.debug("handleData", objects, parentKey, level);
        objects = objects || [];

        const dataHandler = (): Promise<void> =>
            new Promise((resolveData, rejectData) => {
                try {
                    const objectPromises = objects.map(
                        mxObject =>
                            // eslint-disable-next-line
                            new Promise(async resolve => {
                                const attributes = mxObject.getAttributes();
                                const referenceObjects =
                                    this.referenceAttr !== "" && -1 < attributes.indexOf(this.referenceAttr)
                                        ? mxObject.getReferences(this.referenceAttr)
                                        : [];

                                let childAttrValue: string | number | boolean | undefined;
                                if (this.hasChildAttr) {
                                    childAttrValue = await fetchAttr(mxObject, this.hasChildAttr);
                                }

                                let appendIcon: string | null = null;

                                if (this.props.uiRowIconAttr) {
                                    appendIcon = (await fetchAttr(mxObject, this.props.uiRowIconAttr)) as string | null;
                                }

                                const keyPairValues = await this.getObjectKeyPairs(mxObject, appendIcon);

                                const retObj: RowObject = defaults(
                                    {
                                        key: mxObject.getGuid()
                                    },
                                    keyPairValues
                                );

                                if (this.props.uiRowClassAttr) {
                                    const className = (await fetchAttr(mxObject, this.props.uiRowClassAttr)) as
                                        | string
                                        | null;
                                    if (className) {
                                        retObj._className = className;
                                    }
                                }

                                if (appendIcon) {
                                    const prefix = this.props.uiIconPrefix || "glyphicon glyphicon-";
                                    retObj._icon = `${prefix}${appendIcon}`;
                                }

                                if (referenceObjects && 0 < referenceObjects.length) {
                                    retObj._mxReferences = referenceObjects;
                                    retObj.children = [];
                                } else if (childAttrValue) {
                                    retObj._mxHasChildren = true;
                                    retObj.children = [];
                                }

                                if (typeof parentKey !== "undefined" && parentKey !== null) {
                                    retObj._parent = parentKey;
                                }

                                resolve(retObj);
                            })
                    );

                    Promise.all(objectPromises)
                        .then((objs: RowObject[]) => {
                            // eslint-disable-next-line
                            const currentRows: RowObject[] = level === -1 ? [] : clone(this.state.rows);
                            objs.forEach(obj => {
                                const objIndex = currentRows.findIndex(row => row.key === obj.key);
                                if (objIndex === -1) {
                                    currentRows.push(obj);
                                    if (typeof level !== "undefined" && level > 0 && obj.key) {
                                        this.expanderFunc(obj, level - 1);
                                    }
                                } else {
                                    if (obj._mxReferences && obj._mxReferences.length > 0) {
                                        // Are there reference that have not been loaded yet?
                                        const unFoundRows = obj._mxReferences.filter(
                                            o => currentRows.filter(c => c.key === o).length === 0
                                        );
                                        // Does this node already have nodes loaded?
                                        const hasRows =
                                            currentRows.filter(row => row._parent && row._parent === obj.key).length >
                                            0;
                                        if (hasRows && unFoundRows.length > 0) {
                                            // Node has children, but some references that have not been loaded yet. Load them all;
                                            unFoundRows.forEach(guid => {
                                                mx.data.get({
                                                    guid,
                                                    callback: unFoundObject => {
                                                        this.handleData([unFoundObject], obj.key);
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    currentRows.splice(objIndex, 1, obj);
                                }
                            });
                            this.setLoader(false);
                            if (level === -1) {
                                // As this level means we're reloading root data, we have to reset the expandedRows;
                                this.setState({
                                    lastLoadFromContext: +new Date()
                                });
                            }
                            this.setState({ rows: currentRows }, () => {
                                this.resetSubscription();
                                resolveData();
                            });
                        })
                        .catch(err => {
                            throw err;
                        });
                } catch (error) {
                    this.setLoader(false);
                    this.setState({
                        alertMessage: `An error occurred while handling data for ${objects}: ${error}`
                    });
                    rejectData(error);
                }
            });
        this.queue
            .add(dataHandler)
            .then(() => {
                this.debug(
                    this.widgetId,
                    "Data handled for",
                    objects,
                    `Queue length: ${this.queue.getPendingLength()}`
                );
            })
            .catch(err => {
                if (window.logger) {
                    window.logger.error("Data handle error for", objects, err);
                }
            });
    }

    private getObjectKeyPairs(
        obj: mendix.lib.MxObject,
        appendIcon: string | null
    ): Promise<{ [key: string]: string | number | boolean }> {
        const attributes = obj.getAttributes();
        const { columns } = this.state;
        return Promise.all(
            columns.map((col: TreeColumnProps, index: number) => {
                if (col.originalAttr && -1 < attributes.indexOf(col.originalAttr)) {
                    const key = col.id;
                    return this.getFormattedOrTransformed(obj, col.originalAttr).then(res => {
                        const retVal: { [key: string]: string | number | boolean | ReactNode } = {};
                        if (appendIcon && appendIcon !== null && index === 0) {
                            const prefix = this.props.uiIconPrefix || "glyphicon glyphicon-";
                            retVal[key] = createElement(
                                "div",
                                {
                                    className: "ant-table-cell-with-icon"
                                },
                                createElement("i", { className: `ant-table-cell-icon ${prefix}${appendIcon}` }),
                                res
                            );
                        } else {
                            retVal[key] = res;
                        }
                        return retVal;
                    });
                } else {
                    return Promise.resolve({});
                }
            })
        ).then(objects => {
            return defaults({}, ...objects);
        });
    }

    private getFormattedOrTransformed(obj: mendix.lib.MxObject, attr: string): Promise<string | number | boolean> {
        if (this.transformNanoflows[attr] && typeof this.transformNanoflows[attr].nanoflow !== "undefined") {
            return this.executeAction({
                obj,
                nanoflow: this.transformNanoflows[attr]
            }) as Promise<string>;
        }
        const res = this.getFormattedValue(obj, attr);
        return Promise.resolve(res);
    }

    private getFormattedValue(obj: mendix.lib.MxObject, attr: string): string | number | boolean {
        const type = obj.getAttributeType(attr);
        const ret = obj.get(attr);
        if (type === "Enum") {
            return obj.getEnumCaption(attr, ret as string);
        } else if (type === "Boolean") {
            return ret ? "True" : "False";
        } else if (type === "Date" || type === "DateTime") {
            return window.mx.parser.formatValue(ret, type.toLowerCase());
        }
        return ret.valueOf ? ret.valueOf() : ret;
    }

    private expanderFunc(record: TableRecord | RowObject, level: number): void {
        if (typeof record._mxReferences !== "undefined" && record._mxReferences.length > 0) {
            this.setLoader(true, () => {
                const guids = record._mxReferences as string[];
                window.mx.data.get({
                    callback: mxObjects => this.handleData(mxObjects, record.key, level),
                    error: error => {
                        this.setLoader(false);
                        this.setState({
                            alertMessage: `An error occurred while retrieving child items for ${record.key}: ${error}`
                        });
                    },
                    guids
                });
            });
        } else if (record._mxHasChildren && record.key) {
            const node: NodeObject = {
                key: record.key
            };
            if (this.props.childMethod === "microflow" && this.props.getChildMf) {
                node.microflow = this.props.getChildMf;
            } else if (this.props.childMethod === "nanoflow" && this.props.getChildNf) {
                node.nanoflow = this.props.getChildNf;
            }

            if (node.microflow || node.nanoflow) {
                this.setLoader(true, () => {
                    this.executeAction(node, false)
                        .then((result: mendix.lib.MxObject[]) => {
                            this.handleData(result, record.key, level);
                        })
                        .catch(error => {
                            this.setLoader(false);
                            this.setState({
                                alertMessage: `An error occurred while retrieving child items for ${record.key}: ${error}`
                            });
                        });
                });
            }
        }
    }

    private onClick(record: TableRecord): void {
        if (record && record.key) {
            const { onClickAction, onClickMf, onClickNf, onClickForm, onClickOpenPageAs } = this.props;
            if (onClickAction === "open" && onClickForm) {
                const node: NodeObject = {
                    key: record.key,
                    openpage: onClickForm,
                    openpageas: onClickOpenPageAs
                };
                this.executeAction(node);
            } else if (onClickAction === "mf" && onClickMf) {
                this.clickAction(record.key, onClickMf, null);
            } else if (onClickAction === "nf" && onClickNf) {
                this.clickAction(record.key, null, onClickNf);
            }
        }
    }

    private onDblClick(record: TableRecord): void {
        if (record && record.key) {
            const { onDblClickAction, onDblClickMf, onDblClickNf, onDblClickForm, onDblClickOpenPageAs } = this.props;
            if (onDblClickAction === "open" && onDblClickForm) {
                const node: NodeObject = {
                    key: record.key,
                    openpage: onDblClickForm,
                    openpageas: onDblClickOpenPageAs
                };
                this.executeAction(node);
            } else if (onDblClickAction === "mf" && onDblClickMf) {
                this.clickAction(record.key, onDblClickMf, null);
            } else if (onDblClickAction === "nf" && onDblClickNf) {
                this.clickAction(record.key, null, onDblClickNf);
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
            executeNanoFlow(nf, context, this.props.mxform, true);
        }
    }

    private onSelect(ids: string[]): void {
        const { selectMode, mxObject } = this.props;
        if (selectMode === "none") {
            return;
        }
        if (mxObject) {
            try {
                const { selectedObjects } = this.state;
                const currentIds = selectedObjects.map(obj => obj.getGuid());
                const unTouched = selectedObjects.filter(obj => ids.indexOf(obj.getGuid()) !== -1);
                const newIds = ids.filter(id => currentIds.indexOf(id) === -1);

                if (ids.length === 0 || newIds.length === 0) {
                    this.setState({ selectedObjects: unTouched }, () => {
                        this.onSelectAction();
                    });
                } else {
                    getObjects(newIds)
                        .then(newObjects => {
                            const newObjs: mendix.lib.MxObject[] = newObjects || [];
                            this.setState(
                                {
                                    selectedObjects: [...newObjs, ...unTouched]
                                },
                                () => {
                                    this.onSelectAction();
                                }
                            );
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

    private async onSelectAction(): Promise<void> {
        const { selectedObjects } = this.state;
        const { selectOnChangeAction, selectOnChangeMicroflow, selectOnChangeNanoflow } = this.props;
        this.debug("onSelectAction", selectedObjects.length);

        if (this.state.selectFirstOnSingle) {
            this.setState({
                selectFirstOnSingle: false
            });
        }

        // When we do an onChange selection, chances are that you change the context object. In order to avoid re-rendering the table, we temporarily lift
        // all subscriptions, then do the select Action, then reapply the selections. This can also be avoid by creating a helperSelection object and add this
        // to your view, then changing that helper selection Object instead of the context object
        if (selectOnChangeAction === "mf" && selectOnChangeMicroflow) {
            this.clearSubscriptions();
            await this.selectionAction(selectedObjects, selectOnChangeMicroflow, null);
            this.resetSubscription();
        } else if (selectOnChangeAction === "nf" && selectOnChangeNanoflow) {
            this.clearSubscriptions();
            await this.selectionAction(selectedObjects, null, selectOnChangeNanoflow);
            this.resetSubscription();
        }
    }

    private executeAction(
        node: NodeObject,
        showError = true
    ): Promise<string | number | boolean | mendix.lib.MxObject | mendix.lib.MxObject[] | void> {
        this.debug("executeAction", node);
        const context = this.getContext(node);

        if (node.microflow) {
            return executeMicroflow(node.microflow, context, this.props.mxform, showError);
        } else if (node.nanoflow && node.nanoflow.nanoflow) {
            return executeNanoFlow(node.nanoflow, context, this.props.mxform, showError);
        } else if (node.openpage) {
            return openPage({ pageName: node.openpage, openAs: node.openpageas || "popup" }, context, showError);
        }

        return Promise.reject(new Error("Incorrect action"));
    }

    private getContext(node: NodeObject): mendix.lib.MxContext {
        const context = new window.mendix.lib.MxContext();

        if (node.obj && node.obj.getGuid) {
            context.setContext(this.props.nodeEntity, node.obj.getGuid());
            // @ts-ignore
        } else if (node.key) {
            // TODO: This is dirty! Let's not do this
            // @ts-ignore
            context.setContext(this.props.nodeEntity, node.key);
        } else if (this.props.mxObject) {
            context.setContext(this.props.mxObject.getEntity(), this.props.mxObject.getGuid());
        }

        return context;
    }

    private getButtons(actionButtons: ActionButtonProps[]): ReactNode {
        const { selectedObjects } = this.state;
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
                    onClick: () => {}
                };
                if (button.selectABClass) {
                    buttonProp.className = button.selectABClass;
                }

                buttonProp.onClick = () => {
                    const { selectedObjects } = this.state;

                    if (selectedObjects.length > 0) {
                        if (selectABAction === "mf" && selectABMicroflow) {
                            this.selectionAction(selectedObjects, selectABMicroflow, null);
                        } else if (selectABAction === "nf" && selectABNanoflow) {
                            this.selectionAction(selectedObjects, null, selectABNanoflow);
                        }
                    }
                };
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
            return executeMicroflow(mf, context, mxform).then(() => {});
        } else if (nf !== null) {
            return executeNanoFlow(nf, context, mxform).then(() => {});
        }
    }

    private async createHelperObject(nodeObjects?: mendix.lib.MxObject[]): Promise<mendix.lib.MxObject | null> {
        this.debug("createHelperObject", nodeObjects && nodeObjects.length);
        if (!this.props.helperEntity || !this.helperContextReference || !this.helperNodeReference) {
            window.mx.ui.error("Missing Helper entity and/or references");
            return null;
        }

        const helperObject = await createObject(this.props.helperEntity);

        if (this.props.mxObject) {
            helperObject.addReference(this.helperContextReference, this.props.mxObject.getGuid());
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

    private debug(...args: any): void {
        if (window.logger) {
            window.logger.debug(this.widgetId, ...args);
        }
    }

    static getColumns(columns: TreeviewColumnProps[], isStatic = true): TreeColumnProps[] {
        if (!isStatic) {
            return [];
        }
        const newColumns = columns.map(column => {
            const id = createCamelcaseId(column.columnAttr);
            const tableColumn: TreeColumnProps = {
                id,
                label: column.columnHeader,
                originalAttr: column.columnAttr,
                width: column.columnWidth && column.columnWidth !== "" ? column.columnWidth : null,
                className: column.columnClassName && column.columnClassName !== "" ? column.columnClassName : null
            };
            return tableColumn;
        });
        return newColumns;
    }

    static logError(message: string, style?: string, error?: Error): void {
        // eslint-disable-next-line no-unused-expressions,no-console
        window.logger ? window.logger.error(message) : console.log(message, style, error);
    }
}

export default MxTreeTable;
