import { Component, ReactNode, createElement } from "react";

import { MxTreeTableContainerProps } from "../typings/MxTreeTableProps";
import MxTreeTable from "./MxTreeTable";
import { validateProps } from "./util/validation";
import { TreeTable, TreeTableProps } from "./components/TreeTable";

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
        const validationAlert = validateProps(props);
        let columns = MxTreeTable.getColumns(props.columnList);

        if (props.columnMethod === "microflow") {
            columns = [
                {
                    id: "dummy",
                    width: null,
                    originalAttr: "",
                    label: "Columns dynamically loaded through microflow/nanoflow"
                }
            ];
        }

        return {
            className: props.class,
            style: props.style,
            columns,
            rows: [],
            alertMessage: validationAlert,
            showHeader: props.uiShowHeader,
            selectMode: "none",
            clickToSelect: true,
            loading: false,
            lastLoadFromContext: 0
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
