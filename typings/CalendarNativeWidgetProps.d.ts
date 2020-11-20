/**
 * This file was generated from CalendarNativeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export type StartOfWeekEnum = "SUNDAY" | "MONDAY";

export type DarkModeOptionEnum = "SYSTEM" | "LIGHT" | "DARK";

export interface CalendarNativeWidgetProps<Style> {
    name: string;
    style: Style[];
    incomingDates?: ListValue;
    date: ListAttributeValue<Date>;
    volatileDate?: EditableValue<Date>;
    onClick?: ActionValue;
    propertyName: string;
    buttonText: string;
    startOfWeek: StartOfWeekEnum;
    darkModeOption: DarkModeOptionEnum;
    activeSwipeDown: boolean;
    disableMonthChange: boolean;
    autoTriggerAction: boolean;
    disableWeekends: boolean;
    disablePastDates: boolean;
    initialDate: number;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}

export interface CalendarNativeWidgetPreviewProps {
    class: string;
    style: string;
    incomingDates: {} | null;
    date: string;
    volatileDate: string;
    onClick: {} | null;
    propertyName: string;
    buttonText: string;
    startOfWeek: StartOfWeekEnum;
    darkModeOption: DarkModeOptionEnum;
    activeSwipeDown: boolean;
    disableMonthChange: boolean;
    autoTriggerAction: boolean;
    disableWeekends: boolean;
    disablePastDates: boolean;
    initialDate: number | null;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}
