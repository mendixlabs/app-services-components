import { Component, ReactNode, createElement } from "react";
import { TextStyle, View, ViewStyle, Text } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { CalendarNativeWidgetProps } from "../typings/CalendarNativeWidgetProps";
import CalendarInit from "./components/CalendarInit";

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
            onLeftArrow,
            initialDate,
            startOfWeek,
            onRightArrow,
            isActiveDate,
            propertyName,
            volatileDate,
            dateDotColor,
            dynamicOffset,
            incomingDates,
            selectedColor,
            darkModeOption,
            dateSelectColor,
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
                        onLeftArrow={onLeftArrow}
                        startOfWeek={startOfWeek}
                        initialDate={initialDate}
                        onRightArrow={onRightArrow}
                        dateDotColor={dateDotColor}
                        isActiveDate={isActiveDate}
                        volatileDate={volatileDate}
                        propertyName={propertyName}
                        selectedColor={selectedColor}
                        dynamicOffset={dynamicOffset}
                        incomingDates={incomingDates}
                        darkModeOption={darkModeOption}
                        dateSelectColor={dateSelectColor}
                        activeSwipeDown={activeSwipeDown}
                        disableWeekends={disableWeekends}
                        disablePastDates={disablePastDates}
                        selectedTextColor={selectedTextColor}
                        autoTriggerAction={autoTriggerAction}
                        disableMonthChange={disableMonthChange}
                        takeIsActiveIntoAccount={takeIsActiveIntoAccount}
                    />
                ) : (
                    <Text>Loading Calendar...</Text>
                )}
            </View>
        );
    }
}
