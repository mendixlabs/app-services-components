import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle, View, Text } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import CalendarInit from "./components/CalendarInit";
import { CalendarNativeWidgetProps } from "../typings/CalendarNativeWidgetProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class CalendarNativeWidget extends Component<CalendarNativeWidgetProps<CustomStyle>> {
    render(): ReactNode {
        const { incomingDates, description, title, date, selectedColor, selectedTextColor, dotColor } = this.props;
        // console.log("this.props", this.props.volatileDate, this.props.volatileDate?.value);
        const d = new Date("01/07/2020");
        // const z = new Date("11/08/2020");
        // console.log("d", (d.getTime() / 1000).toFixed(0));
        // console.log("x", (z.getTime() / 1000).toFixed(0));
        return (
            <View>
                <CalendarInit
                    date={date}
                    title={title}
                    dotColor={dotColor}
                    description={description}
                    selectedColor={selectedColor}
                    incomingDates={incomingDates}
                    selectedTextColor={selectedTextColor}
                />
                <Text onPress={() => this.props.volatileDate?.setValue(d as any)}>trigger date</Text>
            </View>
        );
    }
}
