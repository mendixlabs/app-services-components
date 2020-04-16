import { observable, action, computed, flow, toJS } from "mobx";
import { RowObjectMxProperties } from "..";
import { TreeColumnProps } from "../../util/columns";
import { createElement } from "react";
import { getFormattedValue } from "@jeltemx/mendix-react-widget-utils";

export interface RowObjectOptions {
    mxObject: mendix.lib.MxObject;
    createTreeRowObject: (mxObject: mendix.lib.MxObject, parentKey?: string | null) => Promise<TreeRowObject>;

    isRoot?: boolean;
    parent?: string | null;
    expanded?: boolean;
    selected?: boolean;
    changeHandler?: (guid?: string, removedCb?: (removed: boolean) => void) => void | Promise<void>;
    mxObjectProperties: RowObjectMxProperties;
    columns: TreeColumnProps[];
}

export interface KeyValues {
    [other: string]: any;
}

export interface TreeRowObject {
    key: string;
    _parent?: string;
    _icon?: string;
    _mxReferences?: string[];
    children?: [];
    [other: string]: any;
}

export class RowObject {
    public _obj: mendix.lib.MxObject;
    public _subscriptions: number[] = [];

    public _changeHandler: (guid?: string, removedCb?: (removed: boolean) => void) => void;
    public _createTreeRowObject: (mxObject: mendix.lib.MxObject, parentKey?: string | null) => Promise<TreeRowObject>;

    @observable _parent: string | null;
    @observable _expanded = false;
    @observable _selected = false;
    @observable _rowClass: string | null = null;
    @observable _iconClass: string | null = null;

    @observable _keyValTransformedPairs: KeyValues = {};
    @observable _keyValCorePairs: KeyValues = {};
    @observable _hasChildren = false;
    @observable _columns: TreeColumnProps[];

    fixAttributes = flow(function*(this: RowObject) {
        this.setIconClass();
        this.setRowClass();
        this.setKeyValues();
        if (this.hasNanoflowColumns) {
            const treeRowObject = (yield this._createTreeRowObject(this._obj, this._parent)) as TreeRowObject;
            this._keyValTransformedPairs = treeRowObject;
        }
    });

    // @ts-ignore
    private _isRoot: boolean;
    private _mxObjectProperties: RowObjectMxProperties;

    constructor({
        mxObject,
        createTreeRowObject,
        columns,
        isRoot = false,
        parent = null,
        selected = false,
        expanded = false,
        changeHandler = (): void => {},
        mxObjectProperties
    }: RowObjectOptions) {
        this._obj = mxObject;
        this._parent = parent;
        this._isRoot = isRoot;
        this._expanded = expanded;
        this._selected = selected;
        this._columns = columns;
        this._mxObjectProperties = mxObjectProperties;

        this._changeHandler = changeHandler;
        this._createTreeRowObject = createTreeRowObject;

        this.resetSubscription();
        this.fixAttributes();
    }

    @action
    clearSubscriptions(): void {
        const { unsubscribe } = window.mx.data;
        this._subscriptions.forEach(subscription => unsubscribe(subscription));
        this._subscriptions = [];
    }

    @action
    resetSubscription(): void {
        const { subscribe } = window.mx.data;
        this.clearSubscriptions();
        if (this._obj) {
            const subscription = subscribe({
                guid: this._obj.getGuid(),
                callback: guid => {
                    if (window.logger) {
                        window.logger.debug(`TreeTable subscription fired row: ${guid}`, this._keyValCorePairs);
                    }
                    this._changeHandler(`${guid}`, removed => {
                        if (removed) {
                            if (window.logger) {
                                window.logger.debug(`Removed row: ${guid}`);
                            }
                        } else {
                            this.fixAttributes();
                        }
                    });
                }
            });
            this._subscriptions.push(subscription);
        }
    }

    @action
    setRoot(state = false): void {
        this._isRoot = state;
    }

    @action
    setMendixObject(obj: mendix.lib.MxObject): void {
        this._obj = obj;
        this.fixAttributes();
    }

    @action
    setColumns(columns: TreeColumnProps[]): void {
        this._columns = columns;
    }

    @action
    setParent(state: string | null = null): void {
        this._parent = state;
    }

    @action
    setSelected(state = false): void {
        this._selected = state;
    }

    @action
    setExpanded(state = false): void {
        this._expanded = state;
    }

    @action
    setRowClass(): void {
        const { uiRowClassAttr } = this._mxObjectProperties;
        if (!uiRowClassAttr || !this._obj.has(uiRowClassAttr)) {
            this._rowClass = null;
        } else {
            const className = this._obj.get(uiRowClassAttr) as string | null;
            this._rowClass = className;
        }
    }

    @action
    setIconClass(): void {
        const { uiRowIconAttr, uiRowIconPrefix } = this._mxObjectProperties;
        const prefix = uiRowIconPrefix || "glyphicon glyphicon-";
        if (!uiRowIconAttr || !this._obj.has(uiRowIconAttr)) {
            this._iconClass = null;
        } else {
            const className = this._obj.get(uiRowIconAttr) as string | null;
            if (className === null || className === "") {
                this._iconClass = null;
            } else {
                this._iconClass = `${prefix}${className}`;
            }
        }
    }

    @action
    setKeyValues(): void {
        // We're only setting the columns that don't need a transform nanoflow
        const keyValues: KeyValues = {};
        this.columns.forEach(col => {
            if (
                col.originalAttr &&
                this._obj.has(col.originalAttr) &&
                !(col.transFromNanoflow && col.transFromNanoflow.nanoflow)
            ) {
                keyValues[col.id] = getFormattedValue(this._obj, col.originalAttr);
            }
        });
        this._keyValCorePairs = keyValues;
    }

    @computed
    get key(): string {
        return this._obj.getGuid();
    }

    @computed
    get columns(): TreeColumnProps[] {
        return this._columns;
    }

    @computed
    get firstColumnId(): string | null {
        return this._columns.length > 0 ? this.columns[0].id : null;
    }

    @computed
    get hasNanoflowColumns(): boolean {
        return (
            this.columns.filter(col => {
                return !!(col.transFromNanoflow && col.transFromNanoflow.nanoflow);
            }).length > 0
        );
    }

    @computed
    get selected(): boolean {
        return this._selected;
    }

    @computed
    get expanded(): boolean {
        return this._expanded;
    }

    @computed
    get hasChildren(): boolean {
        const childRef = this.hasChildrenFromRef;
        return this.hasChildrenFromAttr || (childRef && childRef.length > 0);
    }

    @computed
    get treeObject(): TreeRowObject {
        const keyVals: TreeRowObject = {
            ...this._keyValCorePairs,
            ...this._keyValTransformedPairs,
            key: this.key
        };
        const rowClassName = this._rowClass;
        const iconClassName = this._iconClass;
        const firstColumnId = this.firstColumnId;

        keyVals.key = this.key;

        if (this._parent) {
            keyVals._parent = this._parent;
        }
        if (this.hasChildrenFromRef && this.hasChildrenFromRef.length > 0) {
            keyVals._mxReferences = this.hasChildrenFromRef;
            keyVals.children = [];
        } else if (this.hasChildrenFromAttr) {
            keyVals._mxHasChildren = true;
            keyVals.children = [];
        }
        if (rowClassName) {
            keyVals._className = rowClassName;
        }

        if (iconClassName !== null && firstColumnId !== null && keyVals[firstColumnId]) {
            const formatted = keyVals[firstColumnId];
            keyVals[firstColumnId] = createElement(
                "div",
                {
                    className: "ant-table-cell-with-icon"
                },
                createElement("i", { className: `ant-table-cell-icon ${iconClassName}` }),
                formatted
            );
        }

        return toJS(keyVals);
    }

    // We're not making these calculated, because they need to be reevaluated every time

    get hasChildrenFromRef(): string[] {
        const attributes = this._obj.getAttributes();
        const { nodeChildReference } = this._mxObjectProperties;
        return nodeChildReference !== "" && -1 < attributes.indexOf(nodeChildReference)
            ? this._obj.getReferences(nodeChildReference)
            : [];
    }

    get hasChildrenFromAttr(): boolean {
        const attributes = this._obj.getAttributes();
        const { hasChildAttr } = this._mxObjectProperties;
        return hasChildAttr !== "" && -1 < attributes.indexOf(hasChildAttr)
            ? (this._obj.get(hasChildAttr) as boolean)
            : false;
    }
}
