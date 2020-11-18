import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle, View } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import CalendarInit from "./components/CalendarInit";
import { CalendarNativeWidgetProps } from "../typings/CalendarNativeWidgetProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class CalendarNativeWidget extends Component<CalendarNativeWidgetProps<CustomStyle>> {
    render(): ReactNode {
        const {
            title,
            date,
            dotColor,
            description,
            initialDate,
            volatileDate,
            incomingDates,
            selectedColor,
            activeSwipeDown,
            disableWeekends,
            selectedTextColor,
            autoTriggerAction
        } = this.props;
        // console.log("this.props", this.props.volatileDate, this.props.volatileDate?.value);
        // const d = new Date("01/07/2020");
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
                    initialDate={initialDate}
                    volatileDate={volatileDate}
                    selectedColor={selectedColor}
                    incomingDates={incomingDates}
                    activeSwipeDown={activeSwipeDown}
                    disableWeekends={disableWeekends}
                    autoTriggerAction={autoTriggerAction}
                    selectedTextColor={selectedTextColor}
                />
                {/* <Text onPress={() => this.props.volatileDate?.setValue(d as any)}>trigger date</Text> */}
            </View>
        );
    }
}
