import { Component, ReactNode, createElement } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import Table, { TableRowSelection, ColumnProps } from "antd/es/table";

// Importing seperate so we don't pollute the CSS too much
import "../ui/MxTreeTable.scss";

import { Alerts } from "./Alert";
import { SelectionMode } from "../../typings/MxTreeTableProps";
import { NodeStore } from "../store";
import { TableRecord } from "../util/columns";
import { MockStore } from "../store/index";

export interface TreeColumnProps {
    id: string;
    label: string;
    width: string | null;
    originalAttr: string;
    className?: string | null;
}

export interface TreeTableProps {
    store: NodeStore | MockStore;
    className?: string;
    style?: object;

    expanderFunc?: (record: TableRecord, level: number) => void;

    onClick?: (record: TableRecord) => void;
    onDblClick?: (record: TableRecord) => void;
    getInlineActionButtons?: () => Array<ColumnProps<TableRecord>>;
    onClickOpenRow?: boolean;

    showHeader: boolean;
    clickToSelect: boolean;
    selectMode: SelectionMode;
    onSelect?: (ids: string[], childChange?: { record: TableRecord; selected: boolean }) => void;
    buttonBar?: ReactNode;
    hideSelectBoxes?: boolean;
    renderExpandButton?: boolean;
}

const DEBOUNCE = 250;

@observer
export class TreeTable extends Component<TreeTableProps> {
    debounce: number | null;

    constructor(props: TreeTableProps) {
        super(props);

        this.debounce = null;
        this.onRowClick = this.onRowClick.bind(this);
        this.onRowDblClick = this.onRowDblClick.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
    }

    render(): ReactNode {
        const {
            store,
            className,
            style,
            showHeader,
            selectMode,
            buttonBar,
            clickToSelect,
            onClickOpenRow,
            hideSelectBoxes,
            getInlineActionButtons
        } = this.props;

        const {
            selectedRows,
            expandedKeys,
            treeTableColumns,
            validationMessages,
            removeValidationMessage,
            rowTree,
            isLoading
        } = store;

        const clearDebounce = (): void => {
            if (this.debounce !== null) {
                clearTimeout(this.debounce);
                this.debounce = null;
            }
        };

        const onRow = (record: TableRecord): { [name: string]: () => void } => {
            return {
                onClick: () => {
                    clearDebounce();
                    this.debounce = window.setTimeout(() => {
                        this.onRowClick(record);
                        if (selectMode !== "none" && clickToSelect) {
                            const findKey = selectedRows.indexOf(record.key);
                            const selected = [...selectedRows];
                            const isSelected = findKey !== -1;
                            if (isSelected && selectMode === "single") {
                                this.setSelected([]);
                            } else if (isSelected && selectMode === "multi") {
                                selected.splice(findKey, 1);
                                this.setSelected(selected);
                            } else if (!isSelected && selectMode === "single") {
                                this.setSelected([record.key]);
                            } else if (!isSelected && selectMode === "multi") {
                                selected.push(record.key);
                                this.setSelected(selected);
                            }
                        }
                    }, DEBOUNCE);
                },
                onDoubleClick: () => {
                    clearDebounce();
                    this.debounce = window.setTimeout(() => {
                        this.onRowDblClick(record); // double click row
                    }, DEBOUNCE);
                }
            };
        };

        let rowSelection: TableRowSelection<TableRecord> | undefined;
        if (selectMode !== "none") {
            rowSelection = {
                type: "checkbox",
                selectedRowKeys: selectedRows,
                // onChange: (_keys: string[]) => {
                //     if (selectMode === "multi") {
                //         this.setSelected(keys);
                //     }
                // },
                onSelectAll: (selected: boolean, selectedRows: TableRecord[]) => {
                    const keys = selectedRows.map(row => row.key);
                    if (selectMode === "single" && selectedRows.length > 0) {
                        this.setSelected([]);
                    } else if (selectMode === "multi") {
                        this.setSelected(selected ? keys : []);
                    }
                },
                onSelect: (record: TableRecord, selected: boolean, selectedRows: TableRecord[]) => {
                    const keys = selectedRows.map(row => row.key);
                    if (selectMode === "single") {
                        if (selected) {
                            this.setSelected([record.key]);
                        } else {
                            this.setSelected(keys);
                        }
                    } else {
                        this.setSelected(keys, { record, selected });
                    }
                }
            };
        }

        let columns = treeTableColumns;
        if (getInlineActionButtons) {
            const extraColumns = getInlineActionButtons();
            columns = [...treeTableColumns, ...extraColumns];
        }

        columns = columns.map((col, index) => {
            const newCol = { ...col };
            if (!newCol.key) {
                return newCol;
            }
            if (index === 0 && this.props.renderExpandButton) {
                newCol.title = (
                    <div>
                        {this.renderExpandButton()}
                        {col.title}
                    </div>
                );
            }
            return {
                ...newCol,
                render: (text, record) => {
                    if (index === 0 && record._icon) {
                        return (
                            <div className="ant-table-cell-with-icon">
                                <i className={`ant-table-cell-icon ${record._icon}`} />
                                {text}
                            </div>
                        );
                    }
                    return text;
                }
            };
        });

        return (
            <div
                className={classNames(
                    "widget-treetable-wrapper",
                    hideSelectBoxes ? "hide-selectboxes" : null,
                    className
                )}
                style={style}
            >
                <Alerts validationMessages={validationMessages} remove={removeValidationMessage} />
                {buttonBar}
                <Table
                    columns={columns}
                    dataSource={rowTree}
                    onRow={onRow}
                    onExpand={this.onExpand}
                    pagination={false}
                    showHeader={showHeader}
                    rowSelection={rowSelection}
                    loading={isLoading}
                    expandedRowKeys={expandedKeys}
                    rowClassName={this.rowClassName}
                    expandRowByClick={onClickOpenRow && selectMode !== "multi"}
                />
            </div>
        );
    }

    private renderExpandButton(): ReactNode {
        const expanded = this.props.store.expandedKeys.length > 0;
        const className = classNames("treetable-expand-button");
        if (expanded) {
            return (
                <div role="button" className={className} onClick={this.collapseAll}>
                    <FaCompressAlt />
                </div>
            );
        }
        return (
            <div role="button" className={className} onClick={this.expandAll}>
                <FaExpandAlt />
            </div>
        );
    }

    private setSelected(keys: string[], childChange?: { record: TableRecord; selected: boolean }): void {
        this.onSelectionChange(keys, childChange);
    }

    private rowClassName(record: TableRecord, index: number): string {
        const className =
            typeof record._className !== "undefined" && record._className !== null ? " " + record._className : "";
        return `treetable-treelevel-${index}${className}`;
    }

    private expandAll(): void {
        const parentIds = this.props.store.rowObjects
            .filter(row => typeof row._parent !== "undefined" && row._parent)
            .map(row => row._parent) as string[];
        const filtered = parentIds.filter((item, i, ar) => ar.indexOf(item) === i);

        this.props.store.setExpanded(filtered);
    }

    private collapseAll(): void {
        this.props.store.setExpanded([]);
    }

    private onRowClick(record: TableRecord): void {
        if (this.props.onClick) {
            this.props.onClick(record);
        }
    }

    private onRowDblClick(record: TableRecord): void {
        if (this.props.onDblClick) {
            this.props.onDblClick(record);
        }
    }

    private onSelectionChange(ids: string[], childChange?: { record: TableRecord; selected: boolean }): void {
        if (this.props.onSelect) {
            this.props.onSelect(ids, childChange);
        }
    }

    private onExpand(expanded: boolean, record: TableRecord): void {
        const { expandedKeys } = this.props.store;
        const cloned = [...expandedKeys];
        if (expanded) {
            cloned.push(record.key);
        } else {
            const found = cloned.indexOf(record.key);
            if (found !== -1) {
                cloned.splice(found, 1);
            }
        }
        this.props.store.setExpanded(cloned);
        if (expanded && record.children && record.children.length === 0 && this.props.expanderFunc) {
            this.props.expanderFunc(record, 0);
        }
    }
}
