import { Component, ReactNode, createElement } from "react";

import { MxTreeTableContainerProps } from "../typings/MxTreeTableProps";
import { validateProps } from "./util/validation";
import { TreeTable, TreeTableProps } from "./components/TreeTable";
import { getColumns, getTreeTableColumns } from "./util/columns";
import { MockStore } from "./store/index";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof MxTreeTableContainerProps]: boolean;
};

export class preview extends Component<MxTreeTableContainerProps> {
    render(): ReactNode {
        return (
            <div ref={this.parentInline}>
                <TreeTable {...this.transformProps(this.props)} />
            </div>
        );
    }

    private parentInline(node?: HTMLElement | null): void {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "block";
        }
    }

    private transformProps(props: MxTreeTableContainerProps): TreeTableProps {
        const validationMessages = validateProps(props);
        let columns = getColumns(props.columnList);

        if (props.columnMethod === "microflow") {
            columns = [
                {
                    guid: null,
                    id: "dummy",
                    width: null,
                    originalAttr: "",
                    label: "Columns dynamically loaded through microflow/nanoflow",
                    transFromNanoflow: null
                }
            ];
        }

        const store: MockStore = {
            validationMessages,
            rowTree: [],
            expandedKeys: [],
            isLoading: false,
            selectedRows: [],
            removeValidationMessage: (_id: string): void => {
                console.log("noop", _id);
            },
            setExpanded: () => {
                console.log("noop");
            },
            setSelected: () => {
                console.log("noop");
            },
            treeTableColumns: getTreeTableColumns(columns)
        };

        return {
            store,
            className: props.class,
            style: props.style,
            showHeader: props.uiShowHeader,
            selectMode: "none",
            clickToSelect: true
        };
    }
}

export function getPreviewCss(): string {
    return require("./ui/MxTreeTable.scss");
}

export function getVisibleProperties(props: MxTreeTableContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    visibilityMap.constraint = props.dataSource === "xpath";
    visibilityMap.getDataMf = props.dataSource === "mf";
    visibilityMap.getDataNf = props.dataSource === "nf";

    visibilityMap.childBoolean = props.childMethod === "microflow" || props.childMethod === "nanoflow";
    visibilityMap.childReference = props.childMethod === "reference";
    visibilityMap.getChildMf = props.childMethod === "microflow";
    visibilityMap.getChildNf = props.childMethod === "nanoflow";

    visibilityMap.onClickMf = props.onClickAction === "mf";
    visibilityMap.onClickNf = props.onClickAction === "nf";
    visibilityMap.onClickForm = props.onClickAction === "open";
    visibilityMap.onClickOpenPageAs = props.onClickAction === "open";

    visibilityMap.onDblClickMf = props.onDblClickAction === "mf";
    visibilityMap.onDblClickNf = props.onDblClickAction === "nf";
    visibilityMap.onDblClickForm = props.onDblClickAction === "open";
    visibilityMap.onDblClickOpenPageAs = props.onDblClickAction === "open";

    visibilityMap.selectClickSelect = props.selectMode !== "none";
    visibilityMap.selectHideCheckboxes = props.selectMode !== "none";
    visibilityMap.selectActionButtons = props.selectMode !== "none";
    visibilityMap.selectSelectFirstOnSingle = props.selectMode === "single";

    visibilityMap.columnHeaderEntity = props.columnMethod !== "static";
    visibilityMap.columnHeaderAttrAttribute = props.columnMethod !== "static";
    visibilityMap.columnHeaderClassAttribute = props.columnMethod !== "static";
    visibilityMap.columnHeaderLabelAttribute = props.columnMethod !== "static";
    visibilityMap.columnHeaderMicroflow = props.columnMethod === "microflow";

    return visibilityMap;
}
