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
    componentDidUpdate(pP: CalendarNativeWidgetProps<CustomStyle>) {
        console.log("pP", pP);
        console.log("this.props", this.props);
    }
    render(): ReactNode {
        const {
            date,
            dotColor,
            buttonText,
            initialDate,
            startOfWeek,
            isActiveDate,
            propertyName,
            volatileDate,
            incomingDates,
            selectedColor,
            darkModeOption,
            activeSwipeDown,
            disableWeekends,
            disablePastDates,
            selectedTextColor,
            autoTriggerAction,
            disableMonthChange,
            takeIsActiveIntoAccount
        } = this.props;
        return (
            <View>
                {incomingDates && incomingDates.status === "available" ? (
                    <CalendarInit
                        date={date}
                        dotColor={dotColor}
                        buttonText={buttonText}
                        startOfWeek={startOfWeek}
                        initialDate={initialDate}
                        isActiveDate={isActiveDate}
                        volatileDate={volatileDate}
                        propertyName={propertyName}
                        selectedColor={selectedColor}
                        incomingDates={incomingDates}
                        darkModeOption={darkModeOption}
                        activeSwipeDown={activeSwipeDown}
                        disableWeekends={disableWeekends}
                        disablePastDates={disablePastDates}
                        selectedTextColor={selectedTextColor}
                        autoTriggerAction={autoTriggerAction}
                        disableMonthChange={disableMonthChange}
                        takeIsActiveIntoAccount={takeIsActiveIntoAccount}
                    />
                ) : (
                    <Text>Loading</Text>
                )}
            </View>
        );
    }
}
