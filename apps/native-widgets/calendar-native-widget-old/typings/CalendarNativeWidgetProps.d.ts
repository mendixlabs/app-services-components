/**
 * This file was generated from CalendarNativeWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListAttributeValue } from "mendix";

export type StartOfWeekEnum = "SUNDAY" | "MONDAY";

export type DarkModeOptionEnum = "SYSTEM" | "LIGHT" | "DARK";

export interface CalendarNativeWidgetProps<Style> {
    name: string;
    style: Style[];
    incomingDates?: ListValue;
    date?: ListAttributeValue<Date>;
    dateSelectColor?: ListAttributeValue<string>;
    dateDotColor?: ListAttributeValue<string>;
    isActiveDate?: ListAttributeValue<boolean>;
    volatileDate?: EditableValue<Date>;
    dynamicOffset?: EditableValue<Date>;
    initialDate: number;
    startOfWeek: StartOfWeekEnum;
    activeSwipeDown: boolean;
    propertyName: string;
    takeIsActiveIntoAccount: boolean;
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
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    incomingDates: {} | { type: string } | null;
    date: string;
    dateSelectColor: string;
    dateDotColor: string;
    isActiveDate: string;
    volatileDate: string;
    onClick: {} | null;
    dynamicOffset: string;
    initialDate: number | null;
    startOfWeek: StartOfWeekEnum;
    activeSwipeDown: boolean;
    propertyName: string;
    takeIsActiveIntoAccount: boolean;
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
