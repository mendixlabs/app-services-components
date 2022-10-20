/**
 * This file was generated from Draganddropwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export type SortEnum = "asc" | "desc";

export interface AcceptedUuidType {
    uuids: string;
}

export interface AcceptedUuidPreviewType {
    uuids: string;
}

export interface DraganddropwidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    widgetJsonState: EditableValue<string>;
    hasDataContent: ListWidgetValue;
    hasNoDataContent: ReactNode;
    newParentAction?: ActionValue;
    sameParentAction?: ActionValue;
    uuidStringContainer: string;
    isParent: boolean;
    incomingData: ListValue;
    sortOn: ListAttributeValue<Big>;
    sort: SortEnum;
    isColumn: boolean;
    uuidStringParent?: EditableValue<string>;
    disableDrag: DynamicValue<boolean>;
    acceptedUuid: AcceptedUuidType[];
    uuidStringParentExpression?: DynamicValue<string>;
    uuidStringCurrent: ListAttributeValue<string>;
    readParentTitle?: EditableValue<string>;
    readTitle?: ListAttributeValue<string>;
}

export interface DraganddropwidgetPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    widgetJsonState: string;
    hasDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    hasNoDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    newParentAction: {} | null;
    sameParentAction: {} | null;
    uuidStringContainer: string;
    isParent: boolean;
    incomingData: {} | { type: string } | null;
    sortOn: string;
    sort: SortEnum;
    isColumn: boolean;
    uuidStringParent: string;
    disableDrag: string;
    acceptedUuid: AcceptedUuidPreviewType[];
    uuidStringParentExpression: string;
    uuidStringCurrent: string;
    readParentTitle: string;
    readTitle: string;
}
