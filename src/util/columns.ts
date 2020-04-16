import { createCamelcaseId } from ".";
import { ColumnProps } from "antd/es/table";
import {
    TreeviewColumnProps,
    Nanoflow,
    InlineActionButtonProps,
    InlineActionButtonAction
} from "../../typings/MxTreeTableProps";
import { createElement } from "react";
import { OpenPageAs } from "@jeltemx/mendix-react-widget-utils";

export interface TreeColumnProps {
    id: string;
    label: string;
    width: string | null;
    originalAttr: string;
    guid: string | null;
    className?: string | null;
    transFromNanoflow: Nanoflow | null;
}

export interface TableRecord {
    key: string;
    children?: string[];
    _mxReferences?: string[];
    _className?: string;
    [other: string]: any;
}

export const getColumns = (columns?: TreeviewColumnProps[], isStatic = true): TreeColumnProps[] => {
    if (!isStatic || !columns) {
        return [];
    }
    const newColumns = columns.map((column, index) => {
        const id = createCamelcaseId(column.columnAttr !== "" ? column.columnAttr : `column-${index}`);
        const tableColumn: TreeColumnProps = {
            id,
            label: column.columnHeader,
            originalAttr: column.columnAttr,
            width: column.columnWidth && column.columnWidth !== "" ? column.columnWidth : null,
            guid: null,
            className: column.columnClassName ? column.columnClassName : null,
            transFromNanoflow:
                column.transformNanoflow && column.transformNanoflow.nanoflow ? column.transformNanoflow : null
        };
        return tableColumn;
    });
    return newColumns;
};

export const getTreeTableColumns = (columns: TreeColumnProps[]): Array<ColumnProps<TableRecord>> => {
    return columns.map(col => {
        const treeColumn: ColumnProps<TableRecord> = {
            key: col.id,
            dataIndex: col.id,
            title: col.label
        };
        if (col.width && col.width !== null) {
            const parsed = parseInt(col.width, 10);
            treeColumn.width = !isNaN(parsed) && `${parsed}` === col.width ? parsed : col.width;
        }
        if (col.className) {
            treeColumn.className = col.className;
        }
        return treeColumn;
    });
};

export const getInlineActionButtons = (
    buttons: InlineActionButtonProps[],
    onClickHandler: (
        record: TableRecord,
        action: InlineActionButtonAction,
        microflow: string,
        nanoflow: Nanoflow,
        form: string,
        formOpenAs: OpenPageAs
    ) => void
): Array<ColumnProps<TableRecord>> => {
    return buttons.map(button => {
        const treeColumn: ColumnProps<TableRecord> = {
            className: "buttonColumn",
            render: (_text: any, record: TableRecord) => {
                return createElement(
                    "button",
                    {
                        className: button.actionButtonClass,
                        onClick: () => {
                            onClickHandler(
                                record,
                                button.actionButtonOnClickAction,
                                button.actionButtonOnClickMf,
                                button.actionButtonOnClickNf,
                                button.actionButtonOnClickForm,
                                button.actionButtonOnClickOpenPageAs
                            );
                        }
                    },
                    button.actionButttonLabel
                );
            }
        };
        if (button.actionButtonColumnLabel) {
            treeColumn.title = button.actionButtonColumnLabel;
        }
        if (button.actionButtonColumnClass) {
            treeColumn.className = "buttonColumn " + button.actionButtonColumnClass;
        }
        return treeColumn;
    });
};
