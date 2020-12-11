/**
 * This file was generated from Draganddropwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListWidgetValue } from "mendix";

export interface DraganddropwidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    uuid: string;
    incomingData: ListValue;
    data: ListAttributeValue<BigJs.Big>;
    content?: ListWidgetValue;
    dropDataAttr: EditableValue<string>;
    onDropAction?: ActionValue;
}

export interface DraganddropwidgetPreviewProps {
    class: string;
    style: string;
    uuid: string;
    incomingData: {} | null;
    data: string;
    content: { widgetCount: number; renderer: ComponentType };
    dropDataAttr: string;
    onDropAction: {} | null;
}
