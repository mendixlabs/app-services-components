import { createElement, ReactElement } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { isPast, isToday } from "date-fns";
import { DarkModeOptionEnum } from "../../typings/CalendarNativeWidgetProps";
import { DEFAULT_COLORS, witchDarkMode } from "../utils/theme";

interface CustomDayProps {
    day: any;
    propertyName: string;
    openCalendar: boolean;
    rawInComingDates: any;
    defaultDotColor: string;
    defaultTextColor: string;
    darkModeOption: DarkModeOptionEnum;
    disablePastDates: boolean;
    onDayPress: (day: any) => Promise<void>;
}
const CustomDay = ({
    day,
    onDayPress,
    propertyName,
    openCalendar,
    darkModeOption,
    defaultDotColor,
    defaultTextColor,
    rawInComingDates,
    disablePastDates
}: CustomDayProps): ReactElement => {
    const { marking, date, state } = day;
    const isDarkMode = witchDarkMode(darkModeOption);
    // This is needed as Mon marked days come in as [] and MArked days as {}
    const isMark = !Array.isArray(marking);

    const disabledMark = isMark && marking.disabled;

    const selectedViewStyle = marking.selected && {
        color: defaultTextColor,
        backgroundColor: defaultDotColor
    };
    const isInPastAndDisabled = disablePastDates && isPast(new Date(date.dateString));
    const isItToday = isToday(new Date(date.dateString));
    const markedDay = (isMark: any, marking: any) => {
        if (isMark) {
            if (marking.disabledWithNoMarker) {
                return "none";
            } else {
                if (marking.userSelected) {
                    return "none";
                } else {
                    return defaultDotColor;
                }
            }
        } else {
            return "none";
        }
    };

    const summarizeDay = (day: any) => {
        if (day && rawInComingDates) {
            const reducedRawDates = rawInComingDates.reduce((a: any, c: any) => {
                if (c.formattedDate === day.dateString) {
                    return [...a, c];
                } else {
                    return a;
                }
            }, []);
            if (reducedRawDates.length) {
                return (
                    <Text
                        numberOfLines={2}
                        style={{
                            textAlign: "center",
                            fontSize: 8,
                            paddingTop: 2,
                            color: isDarkMode ? DEFAULT_COLORS.disableGrey : DEFAULT_COLORS.disableGreyDark
                        }}
                    >
                        {reducedRawDates.length} {propertyName}
                    </Text>
                );
            }
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                !disabledMark && !isInPastAndDisabled && onDayPress(date);
            }}
        >
            <View
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }
                ]}
            >
                <View
                    style={[
                        {
                            borderRadius: 100 / 2,
                            width: "60%",
                            padding: 6
                        },
                        selectedViewStyle
                    ]}
                >
                    <Text
                        style={[
                            {
                                textAlign: "center",
                                color: marking.selected
                                    ? DEFAULT_COLORS.white
                                    : isItToday
                                    ? defaultDotColor
                                    : state === "disabled" || disabledMark
                                    ? isDarkMode
                                        ? DEFAULT_COLORS.black
                                        : DEFAULT_COLORS.white
                                    : isDarkMode
                                    ? DEFAULT_COLORS.white
                                    : DEFAULT_COLORS.black
                            }
                        ]}
                    >
                        {date.day}
                    </Text>
                </View>
                {openCalendar && !isInPastAndDisabled && <View>{summarizeDay(date)}</View>}
                {!openCalendar && !isInPastAndDisabled && (
                    <View
                        style={{
                            height: 5,
                            width: 5,
                            borderRadius: 100 / 2,
                            backgroundColor: markedDay(isMark, marking)
                        }}
                    ></View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CustomDay;
