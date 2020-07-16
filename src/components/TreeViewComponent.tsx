import { Component, ReactNode, createElement, MouseEvent } from "react";
import { observer } from "mobx-react";
import { Tree as ArrayTree } from "array-to-tree";
import classNames from "classnames";

import { Key } from "antd/es/table/interface";
import { EventDataNode, DataNode } from "antd/es/tree";
import { Tree, Spin, Input, Empty } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

import debounce from "debounce";

const { Search } = Input;

import { NodeStore } from "../store/index";
import { TreeObject } from "../store/objects/entry";
import { ClickCellType } from "../utils/titlehelper";
import { Alerts } from "./Alerts";

export interface TreeViewComponentProps {
    store: NodeStore;
    draggable: boolean;
    holdSelection: boolean;
    searchEnabled: boolean;
    showIcon: boolean;
    showLine: boolean;
    iconIsGlyphicon: boolean;
    onClickHandler: (_obj: mendix.lib.MxObject, _clickType: ClickCellType) => Promise<void>;
    className: string;
    switcherBg: string;
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

    componentWillMount(): void {
        if (this.props.switcherBg) {
            document.documentElement.style.setProperty("--switcher-icon-bg", this.props.switcherBg);
        }
    }

    componentWillUnmount(): void {
        document.documentElement.style.removeProperty("--switcher-icon-bg");
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
        const { store, draggable, showIcon, showLine } = this.props;
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
                showLine={showLine}
                switcherIcon={showLine ? <CaretDownFilled style={{ backgroundColor: "#F5F8FD" }} /> : undefined}
                selectable={false}
                draggable={draggable}
                onDrop={this.onDrop.bind(this)}
                onExpand={this.onExpand.bind(this)}
                onClick={this.handleClick("single")}
                onDoubleClick={this.handleClick("double")}
                treeData={this.getTreeNodes(store.entryTree)}
            />
        );
    }

    private getTreeNodes(data: ArrayTree<TreeObject>[]): DataNode[] {
        const { iconIsGlyphicon } = this.props;
        return data.map(item => {
            let icon: ReactNode | boolean = false;
            const isLeaf = !((item.children && item.children.length > 0) || item.hasChildren);
            const extraClass = classNames(
                item.highlight ? "highlight" : "",
                item.selected && this.props.holdSelection ? "selected" : "",
                item.icon ? "has-icon" : ""
            );

            if (item.icon) {
                icon = <span className={iconIsGlyphicon ? "glyphicon glyphicon-" + item.icon : item.icon} />;
            }

            const dataNode: DataNode = {
                key: item.guid,
                icon,
                title: item.title,
                isLeaf,
                className: extraClass
            };

            if (item.children && item.children.length > 0 && typeof item.children[0] !== "string") {
                const children = this.getTreeNodes(item.children);
                dataNode.children = children;
            }

            return dataNode;
        });
    }

    private onDrop(info: {
        event: React.MouseEvent;
        node: EventDataNode;
        dragNode: EventDataNode;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }): void {
        if (!info.dragNode.key) {
            return;
        }
        this.props.store.switchEntryParent(info.dragNode.key as string, info.node.key as string);
    }

    private handleClick(
        clickType: ClickCellType
    ): (_evt: MouseEvent<Element, globalThis.MouseEvent>, node: EventDataNode) => void {
        return (_evt: MouseEvent<Element, globalThis.MouseEvent>, node: EventDataNode): void => {
            if (!node.key || !this.props.onClickHandler) {
                return;
            }
            const key = node.key as string;
            const entryObject = this.props.store.findEntry(key);
            if (entryObject && entryObject.mxObject) {
                this.props.onClickHandler(entryObject.mxObject, clickType);
                if (this.props.holdSelection) {
                    this.props.store.selectEntry(entryObject.guid);
                }
            }
        };
    }

    private onExpand(
        _expandedKeys: React.ReactText[],
        info: {
            node: EventDataNode;
            expanded: boolean;
            nativeEvent: globalThis.MouseEvent;
        }
    ): void {
        const { expanded, node } = info;
        if (node && node.key && typeof expanded !== "undefined") {
            this.props.store.expandKey(node.key as string, expanded);
        }
    }
}
