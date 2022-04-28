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
    uuid: string;
    dataSourceName: string;
    dropDataAttr: EditableValue<string>;
    incomingData: ListValue;
    autoSortFilter: boolean;
    sortOn: ListAttributeValue<Big>;
    filterOn: ListAttributeValue<string>;
    onDropAction?: ActionValue;
    onDifferentColumDrop?: ActionValue;
    content: ListWidgetValue;
    emptyData: ReactNode;
}

export interface DraganddropwidgetPreviewProps {
    class: string;
    style: string;
    uuid: string;
    dataSourceName: string;
    dropDataAttr: string;
    incomingData: {} | { type: string } | null;
    autoSortFilter: boolean;
    sortOn: string;
    filterOn: string;
    onDropAction: {} | null;
    onDifferentColumDrop: {} | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    emptyData: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
