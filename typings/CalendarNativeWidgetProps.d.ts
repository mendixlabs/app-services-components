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
    isActiveDate: ListAttributeValue<boolean>;
    volatileDate?: EditableValue<Date>;
    onClick?: ActionValue;
    initialDate: number;
    startOfWeek: StartOfWeekEnum;
    activeSwipeDown: boolean;
    propertyName: string;
    autoTriggerAction: boolean;
    buttonText: string;
    disableMonthChange: boolean;
    disableWeekends: boolean;
    disablePastDates: boolean;
    darkModeOption: DarkModeOptionEnum;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}

export interface CalendarNativeWidgetPreviewProps {
    class: string;
    style: string;
    incomingDates: {} | null;
    date: string;
    isActiveDate: string;
    volatileDate: string;
    onClick: {} | null;
    initialDate: number | null;
    startOfWeek: StartOfWeekEnum;
    activeSwipeDown: boolean;
    propertyName: string;
    autoTriggerAction: boolean;
    buttonText: string;
    disableMonthChange: boolean;
    disableWeekends: boolean;
    disablePastDates: boolean;
    darkModeOption: DarkModeOptionEnum;
    selectedColor: string;
    selectedTextColor: string;
    dotColor: string;
}
