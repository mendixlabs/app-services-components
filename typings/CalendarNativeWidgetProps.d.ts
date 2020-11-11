/**
 * This file was generated from CalendarNativeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface CalendarNativeWidgetProps<Style> {
    name: string;
    style: Style[];
    incomingDates?: ListValue;
    title: ListAttributeValue<string>;
    description: ListAttributeValue<string>;
    date: ListAttributeValue<Date>;
    volatileDate?: EditableValue<Date>;
    onClick?: ActionValue;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}

export interface CalendarNativeWidgetPreviewProps {
    class: string;
    style: string;
    incomingDates: {} | null;
    title: string;
    description: string;
    date: string;
    volatileDate: string;
    onClick: {} | null;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}
