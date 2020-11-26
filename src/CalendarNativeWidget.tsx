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
            </View>
        );
    }
}
