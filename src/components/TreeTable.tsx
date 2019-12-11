import { Component, ReactNode, createElement } from "react";
import classNames from "classnames";
import clone from "lodash/clone";
// import uniq from "lodash/uniq";

import Table, { ColumnProps, TableRowSelection } from "antd/es/table";
import arrayToTree, { Tree } from "array-to-tree";

// Importing seperate so we don't pollute the CSS too much
import "../ui/MxTreeTable.scss";

import { Alert } from "./Alert";
import { SelectionMode } from "../../typings/MxTreeTableProps";

export interface TreeColumnProps {
    id: string;
    label: string;
    width: string | null;
    originalAttr: string;
    className?: string | null;
}

export interface TreeTableProps {
    defaultValue?: string;
    className?: string;
    style?: object;
    columns: TreeColumnProps[];
    rows: RowObject[];
    expanderFunc?: (record: TableRecord, level: number) => void;
    onClick?: (record: TableRecord) => void;
    onDblClick?: (record: TableRecord) => void;
    onClickOpenRow?: boolean;
    alertMessage?: string | string[];
    showHeader: boolean;
    clickToSelect: boolean;
    selectMode: SelectionMode;
    onSelect?: (ids: string[]) => void;
    loading: boolean;
    buttonBar?: ReactNode;
    hideSelectBoxes?: boolean;
    selectFirst?: boolean;
    lastLoadFromContext: number;
}

interface TreeTableState {
    searchColumn: string;
    rows: Tree<RowObject[]>;
    columns: Array<ColumnProps<TableRecord>>;
    alertMessage?: string;
    selectedRowKeys: string[];
    expandedRowKeys: string[];
    lastLoadFromContext: number;
}

export interface TableRecord {
    key: string;
    children?: string[];
    _mxReferences?: string[];
    _className?: string;
    [other: string]: any;
}

export interface RowObject {
    key: string;
    _parent?: string;
    _icon?: string;
    _mxReferences?: string[];
    [other: string]: any;
}

export type PageLocation = "content" | "popup" | "modal";

const arrayToTreeOpts = {
    parentProperty: "_parent",
    customID: "key"
};

const DEBOUNCE = 250;

export class TreeTable extends Component<TreeTableProps, TreeTableState> {
    debounce: number | null;

    constructor(props: TreeTableProps) {
        super(props);

        const rows = this.createTree(props.rows);

        let selected: string[] = [];
        if (props.selectFirst && props.selectMode === "single" && rows.length > 0) {
            selected = [rows[0].key];
        }

        this.state = {
            searchColumn: "all",
            rows,
            columns: this.getColumns(props.columns),
            selectedRowKeys: selected,
            expandedRowKeys: [],
            lastLoadFromContext: props.lastLoadFromContext
        };
        this.debounce = null;
        this.onRowClick = this.onRowClick.bind(this);
        this.onRowDblClick = this.onRowDblClick.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.setSelected = this.setSelected.bind(this);
        // this.expandAll = this.expandAll.bind(this);
        // this.collapseAll = this.collapseAll.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
    }

    render(): ReactNode {
        const {
            className,
            style,
            showHeader,
            selectMode,
            loading,
            buttonBar,
            clickToSelect,
            onClickOpenRow,
            hideSelectBoxes
        } = this.props;
        const { columns, rows, selectedRowKeys, expandedRowKeys } = this.state;
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
                            const findKey = selectedRowKeys.indexOf(record.key);
                            const isSelected = findKey !== -1;
                            if (isSelected && selectMode === "single") {
                                this.setSelected([]);
                            } else if (isSelected && selectMode === "multi") {
                                selectedRowKeys.splice(findKey, 1);
                                this.setSelected(selectedRowKeys);
                            } else if (!isSelected && selectMode === "single") {
                                this.setSelected([record.key]);
                            } else if (!isSelected && selectMode === "multi") {
                                selectedRowKeys.push(record.key);
                                this.setSelected(selectedRowKeys);
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
                selectedRowKeys,
                onChange: (keys: string[]) => {
                    if (selectMode === "multi") {
                        this.setSelected(keys);
                    }
                },
                onSelectAll: () => {
                    if (selectMode === "single" && selectedRowKeys.length > 0) {
                        this.setSelected([]);
                    }
                },
                onSelect: (record: TableRecord, selected: boolean, selectedRows: TableRecord[]) => {
                    if (selectMode === "single") {
                        if (selected) {
                            this.setSelected([record.key]);
                        } else {
                            this.setSelected(selectedRows.map(row => row.key));
                        }
                    }
                }
            };
        }

        return createElement(
            "div",
            {
                className: classNames(
                    "widget-treetable-wrapper",
                    hideSelectBoxes ? "hide-selectboxes" : null,
                    className
                ),
                style
            },
            createElement(Alert, {
                bootstrapStyle: "danger",
                className: "widget-treetable-alert",
                message: this.props.alertMessage
            }),
            buttonBar,
            <Table
                columns={columns}
                dataSource={rows}
                onRow={onRow}
                onExpand={this.onExpand}
                pagination={false}
                showHeader={showHeader}
                rowSelection={rowSelection}
                loading={loading}
                expandedRowKeys={expandedRowKeys}
                rowClassName={this.rowClassName}
                expandRowByClick={onClickOpenRow && selectMode !== "multi"}
            />
        );
    }

    componentWillReceiveProps(newProps: TreeTableProps): void {
        this.setState({
            columns: this.getColumns(newProps.columns),
            rows: this.createTree(newProps.rows)
        });
        if (newProps.lastLoadFromContext !== this.state.lastLoadFromContext) {
            this.setState({
                lastLoadFromContext: newProps.lastLoadFromContext
            });
            this.collapseAll();
        }
    }

    private setSelected(keys: string[]): void {
        this.setState(
            {
                selectedRowKeys: keys
            },
            () => this.onSelectionChange(this.state.selectedRowKeys)
        );
    }

    private rowClassName(record: TableRecord, index: number): string {
        const className =
            typeof record._className !== "undefined" && record._className !== null ? " " + record._className : "";
        return `treetable-treelevel-${index}${className}`;
    }

    // private expandAll(): void {
    //     const parentIds = this.props.rows
    //         .filter(row => typeof row._parent !== "undefined" && row._parent)
    //         .map(row => row._parent) as string[];
    //     this.setState({
    //         expandedRowKeys: uniq(parentIds)
    //     });
    // }

    private collapseAll(): void {
        this.setState({
            expandedRowKeys: []
        });
    }

    private createTree(rows: RowObject[]): Tree<RowObject[]> {
        const tree = arrayToTree(rows, arrayToTreeOpts);

        // When creating the tree, it cann be possible to get orphaned children (a node that has a parent id, but parent removed).
        // We filter these top level elements from the tree, as they are no longer relevant

        return tree.filter(treeEl => typeof treeEl._parent === "undefined" && !treeEl._parent);
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

    private onSelectionChange(ids: string[]): void {
        if (this.props.onSelect) {
            this.props.onSelect(ids);
        }
    }

    private onExpand(expanded: boolean, record: TableRecord): void {
        const { expandedRowKeys } = this.state;
        const cloned = clone(expandedRowKeys);
        if (expanded) {
            cloned.push(record.key);
        } else {
            const found = cloned.indexOf(record.key);
            if (found !== -1) {
                cloned.splice(found, 1);
            }
        }
        this.setState({
            expandedRowKeys: cloned
        });
        if (expanded && record.children && record.children.length === 0 && this.props.expanderFunc) {
            this.props.expanderFunc(record, 0);
        }
    }

    private getColumns(columns: TreeColumnProps[]): Array<ColumnProps<TableRecord>> {
        const stateColumns = columns.map(col => {
            const treeColumn: ColumnProps<TableRecord> = {
                key: col.id,
                dataIndex: col.id,
                title: col.label
            };
            if (col.width && col.width !== null) {
                const parsed = parseInt(col.width, 10);
                treeColumn.width = !isNaN(parsed) && `${parsed}` === col.width ? parsed : col.width;
            }
            if (col.className && col.className !== null) {
                treeColumn.className = col.className;
            }
            return treeColumn;
        });
        return stateColumns;
    }
}
