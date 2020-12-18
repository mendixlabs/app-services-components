/**
 * This file was generated from Draganddropwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ListWidgetValue } from "mendix";

export interface DraganddropwidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    uuid: string;
    dataSourceName: string;
    incomingData: ListValue;
    content: ListWidgetValue;
    emptyData: ReactNode;
    dropDataAttr: EditableValue<string>;
    onDropAction?: ActionValue;
    onDifferentColumDrop?: ActionValue;
}

export interface DraganddropwidgetPreviewProps {
    class: string;
    style: string;
    uuid: string;
    dataSourceName: string;
    incomingData: {} | null;
    content: { widgetCount: number; renderer: ComponentType };
    emptyData: { widgetCount: number; renderer: ComponentType };
    dropDataAttr: string;
    onDropAction: {} | null;
    onDifferentColumDrop: {} | null;
}
