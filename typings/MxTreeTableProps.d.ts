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
type ActionButtonAction = "mf" | "nf";
type OnChangeAction = "nothing" | "mf" | "nf";
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
    selectABHideOnNotApplicable: boolean;
    selectABAction: ActionButtonAction;
    selectABMicroflow: string;
    selectABNanoflow: Nanoflow;
}

export interface MxTreeTableContainerProps extends CommonProps {
    nodeEntity: string;
    dataSource: DataSource;
    constraint: string;
    getDataMf: string;
    getDataNf: Nanoflow;

    childMethod: ChildDataSource;
    childReference: string;
    childBoolean: string;
    getChildMf: string;
    getChildNf: Nanoflow;

    helperEntity: string;
    helperContextReference: string;
    helperNodeReference: string;

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
    selectOnChangeAction: OnChangeAction;
    selectOnChangeMicroflow: string;
    selectOnChangeNanoflow: Nanoflow;
    selectActionButtons: ActionButtonProps[];
}
