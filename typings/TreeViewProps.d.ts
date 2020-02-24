import { CSSProperties } from "react";
import { INanoflow, OpenPageAs } from "@jeltemx/mendix-react-widget-utils";

export interface Nanoflow extends INanoflow {}

export interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    friendlyId?: string;
    tabIndex: number;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
}

export type LoadScenario = "all" | "top";
export type DataSource = "xpath" | "microflow" | "nanoflow";
export type SimpleDataSource = "microflow" | "nanoflow";
export type ChildScenario = "reference" | "action";
export type RelationType = "nodeParent" | "nodeChildren";
export type TitleDataSourceType = "attribute" | "nanoflow";
export type ClickType = "single" | "double";
export type FullAction = "nothing" | "microflow" | "nanoflow" | "open";

export interface TreeViewContainerProps extends CommonProps {
    nodeEntity: string;
    nodeLoadScenario: LoadScenario;
    nodeDataSource: DataSource;
    nodeConstraint: string;
    nodeGetDataMicroflow: string;
    nodeGetDataNanoflow: Nanoflow;

    uiNodeTitleType: TitleDataSourceType;
    uiNodeTitleAttr: string;
    uiNodeTitleNanoflow: Nanoflow;
    uiNodeRenderAsHTML: boolean;
    uiNodeIconAttr: string;
    uiNodeIconIsGlyphicon: boolean;

    relationType: RelationType;
    relationNodeParent: string;
    relationNodeParentHasChildAttr: string;
    relationChildReference: string;

    nodeIsRootAttr: string;

    childScenario: ChildScenario;
    childActionMethod: SimpleDataSource;
    childActionMicroflow: string;
    childActionNanoflow: Nanoflow;

    dragIsDraggable: boolean;

    eventNodeOnClickAction: FullAction;
    eventNodeClickFormat: ClickType;
    eventNodeOnClickMicroflow: string;
    eventNodeOnClickNanoflow: Nanoflow;
    eventNodeOnClickForm: string;
    eventNodeOnClickOpenPageAs: OpenPageAs;

    selectionSelectOnClick: boolean;

    searchEnabled: boolean;
    searchHelperEntity: string;
    searchStringAttribute: string;
    searchNodeReference: string;
    searchNanoflow: Nanoflow;
}

export interface TreeViewPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    sampleText?: string;
}

export interface VisibilityMap {
    sampleText: boolean;
}
