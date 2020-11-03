import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import CalendarInit from "./components/CalendarInit";
import { CalendarNativeWidgetProps } from "../typings/CalendarNativeWidgetProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class CalendarNativeWidget extends Component<CalendarNativeWidgetProps<CustomStyle>> {
    render(): ReactNode {
        return <CalendarInit />;
    }
}
