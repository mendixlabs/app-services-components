import { observable, action, configure, computed, flow } from "mobx";
import arrayToTree, { Tree } from "array-to-tree";
// import { getObject } from "@jeltemx/mendix-react-widget-utils";

import { ValidationMessage } from "@jeltemx/mendix-react-widget-utils/lib/validation";
import { EntryObject, EntryObjectOptions, EntryObjectExtraOptions, TreeObject } from "./objects/entry";
import { RelationType } from "../../typings/TreeViewProps";
import { getObject } from "@jeltemx/mendix-react-widget-utils";

configure({ enforceActions: "observed" });

export interface TreeGuids {
    context: string | null;
    entries?: string[];
}

export interface NodeStoreConstructorOptions {
    contextObject?: mendix.lib.MxObject;
    loadFull: boolean;
    holdSelection?: boolean;
    subscriptionHandler?: (guids: TreeGuids) => void;
    onSelectionChange?: (guids: TreeGuids) => void;
    validationMessages: ValidationMessage[];
    entryObjectAttributes: EntryObjectAttributes;
    childLoader: (parent: EntryObject) => Promise<void>;
    searchHandler?: (_query: string) => Promise<mendix.lib.MxObject[] | null>;
    debug: (...args: unknown[]) => void;
}

export interface EntryObjectAttributes {
    childRef: string | null;
    hasChildAttr: string | null;
    parentRef: string | null;
    rootAttr: string | null;
    iconAttr: string | null;
    relationType: RelationType;
}

const arrayToTreeOpts = {
    parentProperty: "parent",
    customID: "guid"
};

export class NodeStore {
    // Properties
    public subscriptionHandler: (guids: TreeGuids) => void;
    public onSelectionChangeHandler: (guids: TreeGuids) => void;
    public entryObjectAttributes: EntryObjectAttributes;
    public childLoader: (parent: EntryObject) => Promise<void> = async () => {};
    public searchHandler: ((_query: string) => Promise<mendix.lib.MxObject[] | null>) | null;
    public debug: (...args: unknown[]) => void;

    @observable public isLoading: boolean;
    @observable public contextObject: mendix.lib.MxObject | null;
    @observable public entries: EntryObject[] = [];
    @observable public filter: string[] = [];
    @observable public searchQuery = "";

    @observable public width = 0;
    @observable public height = 0;

    @observable public validationMessages: ValidationMessage[] = [];

    private loadFull = false;
    private holdSelection = false;
    private expandedMapping: { [key: string]: string[] } = {};

    constructor(opts: NodeStoreConstructorOptions) {
        const {
            contextObject,
            loadFull,
            holdSelection,
            subscriptionHandler,
            onSelectionChange,
            validationMessages,
            entryObjectAttributes,
            searchHandler,
            childLoader,
            debug
        } = opts;

        this.isLoading = false;
        this.loadFull = typeof loadFull !== "undefined" ? loadFull : false;
        this.holdSelection = typeof holdSelection !== "undefined" ? holdSelection : false;
        this.contextObject = contextObject || null;
        this.subscriptionHandler = subscriptionHandler || ((): void => {});
        this.onSelectionChangeHandler = onSelectionChange || ((): void => {});
        this.searchHandler = searchHandler || null;
        this.debug = debug || ((): void => {});
        this.entryObjectAttributes = entryObjectAttributes || {
            childRef: null,
            hasChildAttr: null,
            parentRef: null,
            rootAttr: null,
            iconAttr: null,
            relationType: "nodeParent"
        };

        if (childLoader) {
            this.childLoader = childLoader;
        }

        this.validationMessages = validationMessages || [];
    }

    search = flow(function*(this: NodeStore, query: string) {
        if (this.searchHandler === null) {
            return;
        }
        this.setLoading(true);
        this.searchQuery = query;
        const objects: mendix.lib.MxObject[] | null = yield this.searchHandler(query);
        this.setLoading(false);
        if (objects === null) {
            return;
        }
        this.filter = objects.map(o => o.getGuid());
        if (query !== "" && this.filter.length > 0) {
            this.expandAll();
        } else {
            this.collapseAll();
        }
    });

    // Entries
    @action
    setEntries(entryObjects: mendix.lib.MxObject[], opts: EntryObjectExtraOptions, clean = true): void {
        this.debug("store: setEntries", entryObjects.length, opts, clean);
        const entries = entryObjects.map(mxObject => this.createEntryObject(mxObject, this.entryHandler(opts), opts));

        if (clean) {
            this.entries = entries;
            this.filter = [];
            this.searchQuery = "";

            if (this.loadFull && this.contextObject && this.expandedMapping[this.contextObject.getGuid()]) {
                const mapping = this.expandedMapping[this.contextObject.getGuid()];
                this.entries.forEach(entry => {
                    if (entry.guid && mapping.find(m => m === entry.guid)) {
                        entry.setExpanded(true);
                    }
                });
            }
        } else {
            const cloned = [...this.entries];
            const clonedIds = cloned.map(e => e.guid);
            entries.forEach(entry => {
                const index = clonedIds.indexOf(entry.guid);
                if (index !== -1) {
                    cloned[index].clearSubscriptions();
                    cloned[index] = entry;
                } else {
                    cloned.push(entry);
                }
            });
            this.entries = cloned;
        }
    }

    @action
    setEntry(entryObject: mendix.lib.MxObject, opts: EntryObjectExtraOptions): void {
        this.setEntries([entryObject], opts, false);
    }

    @action
    removeEntry(guid: string): void {
        const found = this.entries.findIndex(entry => entry.guid === guid);
        if (found !== -1) {
            const cloned = [...this.entries];
            const entry = cloned[found];
            entry.clearSubscriptions();
            cloned.splice(found, 1);
            this.entries = cloned;
        }
    }

    @action
    switchEntryParent(nodeGuid?: string, targetParent?: string): void {
        if (!nodeGuid || !targetParent || this.entryObjectAttributes.relationType === "nodeChildren") {
            return;
        }
        const node = this.findEntry(nodeGuid);
        const parent = this.findEntry(targetParent);

        if (!node || !parent || node.isRoot) {
            return;
        }

        node.setParent(parent.guid, true);
    }

    loadEntryChildren(entryObject: EntryObject): void {
        if (!entryObject || !entryObject.mxObject) {
            return;
        }
        this.childLoader(entryObject);
    }

    // Other

    @action
    setContext(obj?: mendix.lib.MxObject): void {
        this.debug("Store: setContext", obj);

        if (this.contextObject && this.searchQuery === "") {
            this.expandedMapping[this.contextObject.getGuid()] = this.expandedKeys;
        }

        this.contextObject = obj || null;
    }

    @action
    setLoading(state: boolean): void {
        this.isLoading = state;
    }

    // Dimensions

    @action
    setDimenions(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    @action
    setWidth(width: number): void {
        this.width = width;
    }

    @action
    setHeight(height: number): void {
        this.height = height;
    }

    // Selection

    @computed
    get selectedEntries(): EntryObject[] {
        return this.entries.filter(entry => entry.selected);
    }

    @computed
    get selectedEntriesIds(): string[] {
        return this.entries.filter(entry => entry.selected).map(entry => entry.guid);
    }

    @action
    selectEntry(guid: string) {
        if (!this.holdSelection) {
            return;
        }
        let selectedFound = false;
        this.selectedEntries.forEach(entry => {
            if (entry.guid !== guid) {
                entry.setSelected(false);
            } else {
                selectedFound = true;
            }
        });
        if (!selectedFound) {
            const entry = this.findEntry(guid);
            if (entry) {
                entry.setSelected(true);
            }
        }
    }

    // Expanded

    get expandedKeys(): string[] {
        return this.entries.filter(e => e.isExpanded).map(e => e.guid);
    }

    @action
    expandKey(guid: string, expanded: boolean): void {
        const entryObject = this.findEntry(guid);
        if (entryObject) {
            entryObject.setExpanded(expanded);
            if (expanded && !entryObject.isLoaded) {
                this.childLoader(entryObject);
            }
        }
    }

    @action
    expandAll(): void {
        const arrayTree = this.entryTree;
        const walkTree = (branch: arrayToTree.Tree<TreeObject>): void => {
            if (branch.children) {
                const entry = this.findEntry(branch.guid);
                if (entry) {
                    entry.setExpanded(true);
                }
                branch.children.forEach((child: Tree<TreeObject>) => walkTree(child));
            }
        };
        arrayTree.forEach(child => {
            walkTree(child);
        });
    }

    @action
    collapseAll(): void {
        this.entries.forEach(entry => entry.isExpanded && entry.setExpanded(false));
    }

    @computed
    get disabled(): boolean {
        const fatalCount = this.validationMessages.filter(m => m.fatal).length;
        return fatalCount > 0 || this.contextObject === null;
    }

    @action addValidationMessage(message: ValidationMessage): void {
        this.validationMessages.push(message);
    }

    @action removeValidationMessage(id: string): void {
        const messages = [...this.validationMessages];
        const found = messages.findIndex(m => m.id === id);
        if (found !== -1) {
            messages.splice(found, 1);
            this.validationMessages = messages;
        }
    }

    // Entries
    @computed
    get entryList(): TreeObject[] {
        const needParentMapping = this.entryObjectAttributes.relationType === "nodeChildren";
        const treeMapping: { [key: string]: string } = {};
        let entries: TreeObject[] = [...this.entries].map(entry => {
            const obj = entry.obj;
            obj.highlight = false;
            if (needParentMapping && obj.children) {
                obj.children.forEach(child => {
                    treeMapping[child] = obj.guid;
                });
            }
            return obj;
        });

        if (this.entryObjectAttributes.relationType === "nodeChildren") {
            entries = entries.map(entryObj => {
                if (treeMapping[entryObj.guid]) {
                    entryObj.parent = treeMapping[entryObj.guid];
                }
                return entryObj;
            });
        }

        if (this.searchQuery !== "") {
            const rawEntries = [...entries]
                .filter(e => this.filter.indexOf(e.guid) !== -1)
                .map(o => {
                    o.highlight = true;
                    return o;
                });
            const rawGuids = rawEntries.map(e => e.guid);
            const parents = rawEntries.map(e => this.getParents(e));
            parents.forEach(parentsArray => {
                parentsArray.forEach(parent => {
                    if (rawGuids.indexOf(parent.guid) === -1) {
                        rawGuids.push(parent.guid);
                        parent.highlight = false;
                        rawEntries.push(parent);
                    }
                });
            });
            entries = rawEntries;
        }

        return entries;
    }

    @computed
    get entryTree(): Tree<TreeObject>[] {
        const tree = arrayToTree(this.entryList, arrayToTreeOpts);

        // We filter out any objects that don't have a parent and are not root
        return tree.filter(treeEl => !(!treeEl.parent && !treeEl.root));
    }

    private createEntryObject(
        mxObject: mendix.lib.MxObject,
        changeHandler = (..._opts: unknown[]): void => {},
        opts: EntryObjectExtraOptions
    ): EntryObject {
        const entryObjectOptions: EntryObjectOptions = {
            mxObject,
            changeHandler,
            extraOpts: opts
        };

        const entry = new EntryObject(entryObjectOptions, this.entryObjectAttributes);
        return entry;
    }

    public findEntry(guid: string): EntryObject | null {
        if (!this.entries) {
            return null;
        }
        const found = this.entries.find(e => e.guid === guid);
        return found || null;
    }

    private entryHandler(
        opts: EntryObjectExtraOptions
    ): (guid: string, removedCB: (removed: boolean) => void) => Promise<void> {
        return async (guid: string, removedCB: (removed: boolean) => void): Promise<void> => {
            const object = await getObject(guid);
            if (object) {
                const found = this.entries.findIndex(entry => entry.guid === object.getGuid());
                if (found !== -1) {
                    this.setEntry(object, opts);
                    removedCB && removedCB(false);
                }
            } else {
                this.removeEntry(guid);
                removedCB && removedCB(true);
            }
        };
    }

    private getParents(treeObject: TreeObject): TreeObject[] {
        let tree = treeObject;
        const returnArray: TreeObject[] = [];
        while (tree.parent) {
            const parent = this.findEntry(tree.parent);
            if (parent) {
                returnArray.push(parent.obj);
                tree = parent.obj;
            } else {
                break;
            }
        }
        return returnArray;
    }
}
