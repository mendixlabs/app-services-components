/**
 * This file was generated from Draganddropwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

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
    isColumn: boolean;
    sortAsc: boolean;
    uuidStringParent?: EditableValue<string>;
    uuidStringCurrent: ListAttributeValue<string>;
    readParentTitle?: EditableValue<string>;
    readTitle?: ListAttributeValue<string>;
}

export interface DraganddropwidgetPreviewProps {
    class: string;
    style: string;
    widgetJsonState: string;
    hasDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    hasNoDataContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    newParentAction: {} | null;
    sameParentAction: {} | null;
    uuidStringContainer: string;
    isParent: boolean;
    incomingData: {} | { type: string } | null;
    sortOn: string;
    isColumn: boolean;
    sortAsc: boolean;
    uuidStringParent: string;
    uuidStringCurrent: string;
    readParentTitle: string;
    readTitle: string;
}
