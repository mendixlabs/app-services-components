import { observable, action, configure, computed, toJS } from "mobx";
import { ColumnProps } from "antd/es/table";
import arrayToTree, { Tree } from "array-to-tree";
import { ValidationMessage, getObject } from "@jeltemx/mendix-react-widget-utils";
import { TreeColumnProps, getTreeTableColumns, TableRecord } from "../util/columns";
import { RowObject, TreeRowObject } from "./objects/row";

configure({ enforceActions: "observed" });

export interface TreeGuids {
    context: string | null;
    rows: string[];
    columns: string[];
}

export interface TableState {
    context: string | null;
    lastUpdate?: number;
    expanded: string[];
    selected: string[];
}

export interface MockStore {
    rowTree: Tree<TreeRowObject[]>;
    setSelected: (keys?: string[]) => void;
    setExpanded: (keys?: string[]) => void;
    selectedRows: string[];
    expandedKeys: string[];
    treeTableColumns: Array<ColumnProps<TableRecord>>;
    validationMessages: ValidationMessage[];
    removeValidationMessage: (id: string) => void;
    isLoading: boolean;
}

export interface RowObjectMxProperties {
    nodeChildReference: string;
    hasChildAttr: string;
    childIsRootAttr: string;
    uiRowIconAttr: string;
    uiRowIconPrefix: string;
    uiRowClassAttr: string;
}

export interface NodeStoreConstructorOptions {
    contextObject?: mendix.lib.MxObject;
    dataResetOnContextChange?: boolean;
    columns: TreeColumnProps[];
    validColumns: boolean;
    selectFirstOnSingle: boolean;
    validationMessages: ValidationMessage[];
    calculateInitialParents: boolean;
    resetState: boolean;
    rowObjectMxProperties: RowObjectMxProperties;

    childLoader: (guids: string[], parentKey: string, loadFromRef: boolean) => Promise<void>;
    convertMxObjectToRow: (mxObject: mendix.lib.MxObject, parentKey?: string | null) => Promise<TreeRowObject>;
    getInitialTableState: (guid: string) => TableState;
    writeTableState: (state: TableState) => void;
    onSelect: (ids: string[]) => void;
    resetColumns: (col: string) => void;
    reset: () => void;
    debug: (...args: unknown[]) => void;
}

export class NodeStore {
    public debug: (...args: unknown[]) => void;
    public hasChildren = this._hasChildren.bind(this);
    public rowChangeHandler = this._rowChangeHandler.bind(this);
    public findParents = this._findParents.bind(this);
    public setSelectedFromExternal = this._setSelectedFromExternal.bind(this);

    @observable public contextObject: mendix.lib.MxObject | null;
    @observable public isLoading = false;
    @observable public validationMessages: ValidationMessage[] = [];
    @observable public columns: TreeColumnProps[] = [];
    @observable public rowObjects: RowObject[] = [];
    @observable public validColumns = true;
    @observable public subscriptionHandles: number[] = [];

    @observable public selectFirstOnSingle = false;
    @observable public calculateInitialParents = false;
    @observable public resetState = false;

    private rowObjectMxProperties: RowObjectMxProperties;
    private childLoader: (guids: string[], parentKey: string, loadFromRef: boolean) => Promise<void>;
    private convertMxObjectToRow: (mxObject: mendix.lib.MxObject, parentKey?: string | null) => Promise<TreeRowObject>;
    private getInitialTableState: (guid: string) => TableState;
    private writeTableState: (state: TableState) => void;
    private onSelect: (ids: string[]) => void;

    private dataResetOnContextChange: boolean;
    private needToCalculateInitialParents: boolean;
    private needToRestoreStateOnContextChange: boolean;
    private needToRestoreSelectFirst: boolean;

    private reset: () => void;
    private resetColumns: (col: string) => void;

    constructor({
        contextObject,
        dataResetOnContextChange,
        columns,
        validColumns,
        selectFirstOnSingle,
        calculateInitialParents,
        childLoader,
        convertMxObjectToRow,
        rowObjectMxProperties,
        validationMessages,
        getInitialTableState,
        onSelect,
        writeTableState,
        resetState,
        resetColumns,
        reset,
        debug
    }: NodeStoreConstructorOptions) {
        this.contextObject = contextObject || null;
        this.dataResetOnContextChange = typeof dataResetOnContextChange !== 'undefined' ? dataResetOnContextChange : false;
        this.columns = columns;
        this.validColumns = validColumns;
        this.selectFirstOnSingle = selectFirstOnSingle;
        this.needToRestoreSelectFirst = selectFirstOnSingle;
        this.calculateInitialParents = calculateInitialParents;
        this.needToCalculateInitialParents = calculateInitialParents;
        this.validationMessages = validationMessages;
        this.rowObjectMxProperties = rowObjectMxProperties;
        this.getInitialTableState = getInitialTableState;
        this.writeTableState = writeTableState;
        this.resetState = resetState;
        this.needToRestoreStateOnContextChange = resetState;
        this.childLoader = childLoader;
        this.convertMxObjectToRow = convertMxObjectToRow;
        this.resetColumns = resetColumns;
        this.onSelect = onSelect;
        this.reset = reset;
        this.debug = debug || ((): void => {});
    }

    // **********************
    // ACTIONS
    // **********************

    @action
    setContext(obj?: mendix.lib.MxObject): void {
        this.debug("Store: setContext", obj);
        if (this.contextObject !== null && obj && (this.contextObject.getGuid() !== obj.getGuid() || this.dataResetOnContextChange)) {
            if (this.needToCalculateInitialParents) {
                this.calculateInitialParents = true;
                if (this.needToRestoreStateOnContextChange) {
                    this.resetState = true;
                }
            }
            if (this.needToRestoreSelectFirst) {
                this.selectFirstOnSingle = true;
            }
        }
        this.contextObject = obj || null;
    }

    @action
    setLoading(state: boolean): void {
        this.isLoading = state;
    }

    @action
    addValidationMessage(message: ValidationMessage): void {
        this.validationMessages.push(message);
    }

    @action
    removeValidationMessage(id: string): void {
        const messages = [...this.validationMessages];
        const found = messages.findIndex(m => m.id === id);
        if (found !== -1) {
            messages.splice(found, 1);
            this.validationMessages = messages;
        }
    }

    @action
    setColumns(columns: TreeColumnProps[]): void {
        this.columns = columns;
        this.rowObjects.forEach(row => row.setColumns(columns));
    }

    @action
    setValidColumns(state: boolean): void {
        this.validColumns = state;
    }

    @action
    setSelectFirstOnSingle(state: boolean): void {
        this.selectFirstOnSingle = state;
    }

    @action
    setRowObjects(mxObjects: mendix.lib.MxObject[], level?: number, parent?: string | null): void {
        this.debug("store: setRowObjects", mxObjects.length, level);
        const currentRows: RowObject[] = level === -1 ? [] : [...this.rowObjects];
        let initialState: TableState = { context: this.contextObject?.getGuid() || null, expanded: [], selected: [] };

        const objectGuids = mxObjects.map(obj => obj.getGuid());
        const treeMapping: { [key: string]: string } = {};
        const rootObjectGuids: string[] = [];

        // Calculate parents when loading a whole tree;

        if (
            this.calculateInitialParents &&
            this.rowObjectMxProperties.nodeChildReference &&
            this.rowObjectMxProperties.childIsRootAttr
        ) {
            mxObjects.forEach(obj => {
                if (obj && obj.has(this.rowObjectMxProperties.nodeChildReference)) {
                    obj.getReferences(this.rowObjectMxProperties.nodeChildReference).forEach(ref => {
                        treeMapping[ref] = obj.getGuid();
                    });
                }
                if (obj && obj.has(this.rowObjectMxProperties.childIsRootAttr)) {
                    if (obj.get(this.rowObjectMxProperties.childIsRootAttr) as boolean) {
                        rootObjectGuids.push(obj.getGuid());
                    }
                }
            });
        }

        if (this.resetState && this.contextObject) {
            // Reset state if applicable
            this.debug("store: setRowObjects get state: ", this.contextObject.getGuid());
            const initialTablesState = this.getInitialTableState(this.contextObject.getGuid());

            // We need to filter out any that are not in the initial state
            initialState = {
                context: initialTablesState.context,
                selected: initialTablesState.selected.filter(s => objectGuids.indexOf(s) !== -1),
                expanded: initialTablesState.expanded.filter(s => objectGuids.indexOf(s) !== -1)
            };
        }

        if (initialState.selected.length === 0 && this.selectFirstOnSingle) {
            if (rootObjectGuids.length > 0) {
                initialState.selected = [rootObjectGuids[0]];
                this.onSelect(initialState.selected);
            } else if (mxObjects.length > 0 && level === -1) {
                initialState.selected = [mxObjects[0].getGuid()];
                this.onSelect(initialState.selected);
            }
        }

        mxObjects.forEach(mxObject => {
            const objIndex = currentRows.findIndex(row => row.key === mxObject.getGuid());
            if (objIndex === -1) {
                const treeParent = treeMapping[mxObject.getGuid()];
                const parentObj = this.calculateInitialParents && treeParent ? treeParent : parent;
                currentRows.push(
                    new RowObject({
                        mxObject,
                        columns: this.columns,
                        createTreeRowObject: this.convertMxObjectToRow,
                        parent: parentObj,
                        changeHandler: this.rowChangeHandler(),
                        isRoot: rootObjectGuids.indexOf(mxObject.getGuid()) !== -1,
                        expanded: initialState.expanded.indexOf(mxObject.getGuid()) !== -1,
                        selected: initialState.selected.indexOf(mxObject.getGuid()) !== -1,
                        mxObjectProperties: this.rowObjectMxProperties
                    })
                );
                // TODO
                // if (typeof level !== "undefined" && level > 0 && obj.key) {
                //     // this.expanderFunction(obj, level - 1);
                // }
            } else {
                const rowObj = currentRows[objIndex];
                const references = rowObj.treeObject._mxReferences;
                if (references && references.length > 0) {
                    // Are there reference that have not been loaded yet?
                    const unFoundRows = references.filter(o => currentRows.filter(c => c.key === o).length === 0);
                    // Does this node already have nodes loaded?
                    const hasRows = currentRows.filter(row => row._parent && row._parent === rowObj.key).length > 0;
                    if (hasRows && unFoundRows.length > 0) {
                        // Node has children, but some references that have not been loaded yet. Load them all;
                        this.childLoader(unFoundRows, rowObj.key, true);
                    }
                }
                rowObj.resetSubscription();
                rowObj.fixAttributes();
            }
        });
        this.rowObjects = currentRows;
        if (this.calculateInitialParents) {
            this.disableCalculateInitial();
        }
        if (this.resetState) {
            this.disableResetState();
        }
        if (this.selectFirstOnSingle) {
            this.setSelectFirstOnSingle(false);
        }
    }

    @action
    removeRowObject(guid: string): void {
        const rows = [...this.rowObjects];
        const index = rows.findIndex(rowObj => rowObj.key === guid);

        if (index !== -1) {
            const row = rows[index];
            rows.splice(index, 1);
            row.clearSubscriptions();
            if (row.selected) {
                // TODO trigger selection change
            }
            this.rowObjects = rows;
        }

        this.resetSubscriptions();
    }

    @action
    setExpanded(keys?: string[], writeState = true): void {
        this.debug("store: setExpanded", keys);
        const current = this.expandedKeys;
        const newKeys = keys || [];

        const toRemove = current.filter(x => !newKeys.includes(x));
        const toAdd = newKeys.filter(x => !current.includes(x));

        toRemove.forEach(id => {
            const obj = this.findRowObject(id);
            if (obj) {
                obj.setExpanded(false);
            }
        });

        toAdd.forEach(id => {
            const obj = this.findRowObject(id);
            if (obj) {
                obj.setExpanded(true);
            }
        });

        if (writeState) {
            this.writeTableState(this.tableState);
        }
    }

    @action
    setSelected(keys?: string[], writeState = true): void {
        this.debug("store: setSelected", keys);
        const current = this.selectedRows;
        const newKeys = keys || [];

        const toRemove = current.filter(x => !newKeys.includes(x));
        const toAdd = newKeys.filter(x => !current.includes(x));

        toRemove.forEach(id => {
            const obj = this.findRowObject(id);
            if (obj) {
                obj.setSelected(false);
            }
        });

        toAdd.forEach(id => {
            const obj = this.findRowObject(id);
            if (obj) {
                obj.setSelected(true);
            }
        });

        if (writeState) {
            this.writeTableState(this.tableState);
        }
    }

    @action
    clearSubscriptions(from = ""): void {
        this.debug("store: clearSubscriptions // from: ", from);
        if (this.subscriptionHandles && this.subscriptionHandles.length > 0) {
            this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
            this.subscriptionHandles = [];
        }
    }

    @action
    resetSubscriptions(from = ""): void {
        this.clearSubscriptions(from);
        this.debug("store: resetSubscriptions // from: ", from);

        const { subscribe } = window.mx.data;

        if (this.contextObject && this.contextObject.getGuid && !this.dataResetOnContextChange) {
            const guid = this.contextObject.getGuid();
            this.subscriptionHandles.push(
                subscribe({
                    callback: () => {
                        this.debug(`store: subcription fired context ${guid}`);
                        this.clearSubscriptions("store context subscription");
                        this.reset();
                    },
                    guid
                })
            );
        }

        if (this.tableGuids && this.tableGuids.columns && this.tableGuids.columns.length > 0) {
            this.tableGuids.columns.forEach(col => {
                this.subscriptionHandles.push(
                    subscribe({
                        guid: col,
                        callback: () => {
                            this.debug(`store: subcription fired col ${col}`);
                            this.resetColumns(col);
                        }
                    })
                );
            });
        }
    }

    @action
    disableCalculateInitial(): void {
        this.calculateInitialParents = false;
    }

    @action
    disableResetState(): void {
        this.resetState = false;
    }

    // **********************
    // COMPUTED
    // **********************

    @computed
    get disabled(): boolean {
        const fatalCount = this.validationMessages.filter(m => m.fatal).length;
        return fatalCount > 0 || this.contextObject === null;
    }

    @computed
    get treeTableColumns(): Array<ColumnProps<TableRecord>> {
        return getTreeTableColumns(this.columns);
    }

    @computed
    get expandedKeys(): string[] {
        return toJS(this.rowObjects.filter(r => r.expanded).map(r => r.key));
    }

    @computed
    get selectedRows(): string[] {
        return toJS(this.rowObjects.filter(r => r.selected).map(r => r.key));
    }

    @computed
    get rowTree(): Tree<TreeRowObject[]> {
        const arrayToTreeOpts = {
            parentProperty: "_parent",
            customID: "key"
        };

        try {
            const treeObjects = this.rowObjects.map(r => r.treeObject);
            const tree = arrayToTree(treeObjects, arrayToTreeOpts);

            // When creating the tree, it can be possible to get orphaned children (a node that has a parent id, but parent removed).
            // We filter these top level elements from the tree, as they are no longer relevant

            return tree.filter(treeEl => typeof treeEl._parent === "undefined" && !treeEl._parent);
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    @computed
    get tableGuids(): TreeGuids {
        const columns = this.columns.filter(col => col.guid !== null).map(col => col.guid) as string[];

        return {
            context: this.contextObject ? this.contextObject.getGuid() : null,
            rows: this.rowObjects.map(row => row.key),
            columns
        };
    }

    @computed
    get tableState(): TableState {
        return {
            context: this.contextObject ? this.contextObject.getGuid() : null,
            expanded: this.expandedKeys,
            selected: this.selectedRows
        };
    }

    public findRowObject(guid: string): RowObject | null {
        if (!this.rowObjects || !guid) {
            return null;
        }
        const found = this.rowObjects.find(e => e.key === guid);
        return found || null;
    }

    private _hasChildren(row: TreeRowObject): boolean {
        return this.rowObjects.filter(findRow => findRow._parent && findRow._parent === row.key).length > 0;
    }

    private _setSelectedFromExternal(guid: string): void {
        const object = this.findRowObject(guid);
        if (object) {
            const parents = this.findParents(object);
            this.setSelected([object.key]);
            this.setExpanded(parents.map(p => p.key));
            this.onSelect([object.key]);
        }
    }

    private _findParents(rowObject: RowObject): RowObject[] {
        let tree = rowObject;
        const returnArray: RowObject[] = [];
        while (tree._parent) {
            const parent = this.findRowObject(tree._parent);
            if (parent) {
                returnArray.push(parent);
                tree = parent;
            } else {
                break;
            }
        }
        return returnArray;
    }

    private _rowChangeHandler(): (guid: string, removedCB: (removed: boolean) => void) => Promise<void> {
        return async (guid: string, removedCB: (removed: boolean) => void): Promise<void> => {
            this.debug("store: rowChangeHandler", guid);
            const object = await getObject(guid);
            if (object) {
                const found = this.rowObjects.find(entry => entry._obj.getGuid() === object.getGuid());
                if (found) {
                    found.setMendixObject(object);

                    // TODO Got to make this better. It's dirty, because calculated references are not propagated yet when you have unfound element;
                    const objRef =
                        (this.rowObjectMxProperties.nodeChildReference !== "" &&
                            object.getReferences(this.rowObjectMxProperties.nodeChildReference)) ||
                        [];
                    const unfound = objRef.filter(r => this.findRowObject(r) === null);
                    const hasRows = this.rowObjects.filter(row => row._parent && row._parent === found.key).length > 0;

                    if (unfound.length > 0) {
                        // Node has children, but some references that have not been loaded yet. Load them all;
                        this.childLoader(unfound, found.key, true);
                    } else if (hasRows) {
                        this.childLoader([], found.key, false);
                    }

                    if (removedCB) {
                        removedCB(false);
                    }
                }
            } else {
                this.removeRowObject(guid);
                if (removedCB) {
                    removedCB(true);
                }
            }
        };
    }
}
