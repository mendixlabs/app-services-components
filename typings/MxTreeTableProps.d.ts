import { CSSProperties } from "react";
import { INanoflow, OpenPageAs } from "@jeltemx/mendix-react-widget-utils";

export interface Nanoflow extends INanoflow {}

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    friendlyId?: string;
    tabIndex: number;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
}

export type ClickOptions = "nothing" | "mf" | "nf" | "open";
export type InlineActionButtonAction = "mf" | "nf" | "open";
export type DataSource = "xpath" | "mf" | "nf";
export type ActionButtonAction = "mf" | "nf";
export type OnChangeAction = "nothing" | "mf" | "nf";
export type ChildDataSource = "disabled" | "reference" | "microflow" | "nanoflow";
export type SelectionMode = "none" | "single" | "multi";
export type ColumnMethod = "static" | "microflow";
export type LoadScenario = "partial" | "all";
export type StateManagementType = "disabled" | "localStorage" /*| "mendix"*/;
export type StateManagementStorage = "session" | "local";
export type ColumnTitleType = "attr" | "nanoflow";

export interface TreeviewColumnProps {
    columnHeader: string;
    columnAttr: string;
    columnTitleType: ColumnTitleType;
    transformNanoflow?: Nanoflow;
    columnWidth?: string;
    columnClassName?: string;
}

export interface SelectActionButtonProps {
    selectABLabel: string;
    selectABClass: string;
    selectABHideOnNotApplicable: boolean;
    selectABAction: ActionButtonAction;
    selectABMicroflow: string;
    selectABNanoflow: Nanoflow;
}

export interface InlineActionButtonProps {
    actionButtonClass: string;
    actionButttonLabel: string;
    actionButtonColumnLabel: string;
    actionButtonColumnClass: string;
    actionButtonOnClickAction: InlineActionButtonAction;
    actionButtonOnClickMf: string;
    actionButtonOnClickNf: Nanoflow;
    actionButtonOnClickForm: string;
    actionButtonOnClickOpenPageAs: OpenPageAs;
}

export interface MxTreeTableContainerProps extends CommonProps {
    nodeEntity: string;
    loadScenario: LoadScenario;
    dataSource: DataSource;
    constraint: string;
    getDataMf: string;
    getDataNf: Nanoflow;
    nodeIsRootAttr: string;
    dataResetOnContextChange: boolean;

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
    inlineActionButtons: InlineActionButtonProps[];

    onClickAction: ClickOptions;
    onClickMf: string;
    onClickNf: Nanoflow;
    onClickForm: string;
    onClickOpenPageAs: OpenPageAs;
    onDblClickAction: ClickOptions;
    onDblClickMf: string;
    onDblClickNf: Nanoflow;
    onDblClickForm: string;
    onDblClickOpenPageAs: OpenPageAs;

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
    selectActionButtons: SelectActionButtonProps[];

    stateManagementType: StateManagementType;
    stateLocalStorageTime: number;
    stateLocalStorageType: StateManagementStorage;
    stateLocalStorageKey: string;
    stateExecuteSelectActionOnRestore: boolean;
    // stateEntity: string;
    // getStateObjectMicroflow: string;
    // stateNodeSelectionReference: string;
    // stateNodeExpandReference: string;
    experimentalExposeSetSelected: boolean;
}
