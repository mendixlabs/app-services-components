import { Component, ReactNode, createElement } from "react";
import { observer } from "mobx-react";
import { Tree as ArrayTree } from "array-to-tree";
import Tree, { AntTreeNode } from "antd/es/tree";
import Spin from "antd/es/spin";
import Input from "antd/es/input";
import Empty from "antd/es/empty";
import debounce from "debounce";

const { TreeNode } = Tree;
const { Search } = Input;

import { NodeStore } from "../store/index";
import { TreeObject } from "../store/objects/entry";
import { AntTreeNodeDropEvent, AntTreeNodeExpandedEvent } from "antd/es/tree/Tree";
import { ClickCellType } from "../utils/titlehelper";
import { Alerts } from "./Alerts";
import classNames from "classnames";

export interface TreeViewComponentProps {
    store: NodeStore;
    draggable: boolean;
    searchEnabled: boolean;
    showIcon: boolean;
    iconIsGlyphicon: boolean;
    onClickHandler: (_obj: mendix.lib.MxObject, _clickType: ClickCellType) => Promise<void>;
    className: string;
}

@observer
export class TreeViewComponent extends Component<TreeViewComponentProps> {
    render(): ReactNode {
        const { store, className } = this.props;

        const containerClass = classNames("treeview-widget", className);
        const spinnerClass = classNames("treeview-widget-spinner");

        return (
            <div className={containerClass}>
                {this.renderControl()}
                <Spin className={spinnerClass} spinning={store.isLoading} delay={500} tip="Loading tree data">
                    {this.renderTree()}
                </Spin>
            </div>
        );
    }

    private renderControl(): ReactNode {
        const { store, searchEnabled } = this.props;

        if (store.disabled) {
            return null;
        }

        if (searchEnabled) {
            const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
                if (event.target) {
                    const val = event.target.value;
                    debounce((str: string) => {
                        store.search(str);
                    }, 200)(val);
                }
            };
            const disabled = store.isLoading;

            return (
                <div className={classNames("treeview-widget-control")}>
                    <Search
                        placeholder="Type to search"
                        loading={disabled}
                        allowClear
                        onChange={onSearch}
                        value={store.searchQuery}
                    />
                </div>
            );
        }

        return <div></div>;
        // return (
        //     <div>
        //         <button className={"btn"} onClick={store.expandAll.bind(store)}>expand all</button>
        //         <button className={"btn"} onClick={store.collapseAll.bind(store)}>collapse all</button>
        //     </div>
        // )
    }

    private renderTree(): ReactNode {
        const { store, draggable, showIcon } = this.props;
        const { validationMessages, removeValidationMessage, expandedKeys } = store;
        const treeClass = classNames("treeview-widget-tree");

        if (store.disabled) {
            return <Alerts validationMessages={validationMessages} remove={removeValidationMessage} />;
        }

        if (store.entryTree.length === 0 && !store.isLoading) {
            return <Empty />;
        }

        return (
            <Tree
                className={treeClass}
                expandedKeys={expandedKeys}
                showIcon={showIcon}
                selectable={false}
                draggable={draggable}
                onDrop={this.onDrop.bind(this)}
                onExpand={this.onExpand.bind(this)}
                onClick={this.handleClick("single")}
                onDoubleClick={this.handleClick("double")}
            >
                {this.renderTreeNodes(store.entryTree)}
            </Tree>
        );
    }

    private renderTreeNodes(data: ArrayTree<TreeObject>[]): ReactNode {
        const { iconIsGlyphicon } = this.props;
        return data.map(item => {
            let icon: ReactNode | boolean = false;
            const isLeaf = !((item.children && item.children.length > 0) || item.hasChildren);
            const extraClass = classNames(item.highlight ? "highlight" : "");

            if (item.icon) {
                icon = <span className={iconIsGlyphicon ? "glyphicon glyphicon-" + item.icon : item.icon} />;
            }

            if (item.children) {
                return (
                    <TreeNode key={item.guid} title={item.title} icon={icon} isLeaf={isLeaf} className={extraClass}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.guid} icon={icon} title={item.title} isLeaf={isLeaf} className={extraClass} />;
        });
    }

    private onDrop(opts: AntTreeNodeDropEvent): void {
        if (!opts.dragNode.props.eventKey) {
            return;
        }
        // console.log(`Dragged : ${opts.dragNode.props.eventKey} to ${opts.node.props.eventKey}`);
        this.props.store.switchEntryParent(opts.dragNode.props.eventKey, opts.node.props.eventKey);
    }

    private handleClick(clickType: ClickCellType): (_evt: unknown, _node: AntTreeNode) => void {
        return (_evt: unknown, node: AntTreeNode) => {
            if (!node.props.eventKey || !this.props.onClickHandler) {
                return;
            }
            const entryObject = this.props.store.findEntry(node.props.eventKey);
            if (entryObject && entryObject.mxObject) {
                this.props.onClickHandler(entryObject.mxObject, clickType);
            }
        };
    }

    private onExpand(_expandedKeys: string[], info: AntTreeNodeExpandedEvent): void {
        const { expanded, node } = info;
        if (node && node.props.eventKey && typeof expanded !== "undefined") {
            this.props.store.expandKey(node.props.eventKey, expanded);
        }
    }
}
