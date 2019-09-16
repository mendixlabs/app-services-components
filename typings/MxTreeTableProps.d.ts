import { CSSProperties } from "react";
import { Nanoflow } from "../src/MxTreeTable";
import { PageLocation } from "../src/components/TreeTable";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
}

type ClickOptions = "nothing" | "mf" | "nf" | "open";
type DataSource = "xpath" | "mf" | "nf";
type ChildDataSource = "disabled" | "reference" | "microflow" | "nanoflow";
export type SizeOption = "default" | "middle" | "small";
export type SelectionMode = "none" | "single" | "multi";
// export type ColumnMethod = "static" | "microflow" | "nanoflow";
export type ColumnMethod = "static" | "microflow";

export interface TreeviewColumnProps {
    columnHeader: string;
    columnAttr: string;
    transformNanoflow?: Nanoflow;
    columnWidth?: string;
    columnClassName?: string;
}

export interface ActionButtonProps {
    selectABLabel: string;
    selectABClass: string;
    selectABMicroflowMulti: string;
    selectABMicroflowSingle: string;
}

export interface MxTreeTableContainerProps extends CommonProps {
    /** entity - describes the node */
    nodeEntity: string;
    dataSource: DataSource;
    /** constraint to get the data */
    constraint: string;
    /** microflow */
    getDataMf: string;
    /** microflow */
    getDataNf: Nanoflow;
    /** get child method */
    childMethod: ChildDataSource;
    /** entity */
    childReference: string;
    /** attribute */
    childBoolean: string;
    /** microflow */
    getChildMf: string;
    /** nanoflow */
    getChildNf: Nanoflow;
    /** columns */
    columnList: TreeviewColumnProps[];
    columnHeaderEntity: string;
    columnHeaderLabelAttribute: string;
    columnHeaderAttrAttribute: string;
    columnHeaderClassAttribute: string;
    columnHeaderMicroflow: string;
    columnHeaderNanoflow: Nanoflow;
    columnMethod: ColumnMethod;

    onClickAction: ClickOptions;
    onClickMf: string;
    onClickNf: Nanoflow;
    onClickForm: string;
    onClickOpenPageAs: PageLocation;
    onDblClickAction: ClickOptions;
    onDblClickMf: string;
    onDblClickNf: Nanoflow;
    onDblClickForm: string;
    onDblClickOpenPageAs: PageLocation;

    uiSize: SizeOption;
    uiShowHeader: boolean;
    uiRowClassAttr: string;
    uiRowIconAttr: string;
    uiIconPrefix: string;

    selectMode: SelectionMode;
    selectClickSelect: boolean;
    selectHideCheckboxes: boolean;
    selectSelectFirstOnSingle: boolean;
    selectActionButtons: ActionButtonProps[];
    // selectMicroflow: string;
    // selectNanoflow: Nanoflow;
}
