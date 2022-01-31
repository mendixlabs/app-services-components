/**
 * This file was generated from DndWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface AcceptedUuidType {
    uuids: string;
}

export interface AcceptedUuidPreviewType {
    uuids: string;
}

export interface DndWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    widgetJsonState: EditableValue<string>;
    hasDataContent: ListWidgetValue;
    hasNoDataContent: ReactNode;
    newParentAction?: ActionValue;
    sameParentAction?: ActionValue;
    incomingData: ListValue;
    sortOn: ListAttributeValue<Big>;
    isColumn: boolean;
    sortAsc: boolean;
    uuidStringParent?: EditableValue<string>;
    uuidStringCurrent: ListAttributeValue<string>;
    uuidStringContainer: string;
    acceptedUuid: AcceptedUuidType[];
}

export interface DndWidgetPreviewProps {
    class: string;
    style: string;
    widgetJsonState: string;
    hasDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    hasNoDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    newParentAction: {} | null;
    sameParentAction: {} | null;
    incomingData: {} | { type: string } | null;
    sortOn: string;
    isColumn: boolean;
    sortAsc: boolean;
    uuidStringParent: string;
    uuidStringCurrent: string;
    uuidStringContainer: string;
    acceptedUuid: AcceptedUuidPreviewType[];
}
