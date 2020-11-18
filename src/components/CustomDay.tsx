import { createElement } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { isPast, isToday } from "date-fns";

interface CustomDayProps {
    day: any;
    openCalendar: boolean;
    rawInComingDates: any;
    defaultDotColor: string;
    defaultTextColor: string;
    disablePastDates: boolean;
    onDayPress: (day: any) => Promise<void>;
}
const CustomDay = ({
    day,
    onDayPress,
    openCalendar,
    defaultDotColor,
    defaultTextColor,
    rawInComingDates,
    disablePastDates
}: CustomDayProps) => {
    const { marking, date, state } = day;
    // Styling needs to change if date is 1 char or 2
    const isDayLong = date.day <= 9;
    // This is needed as Mon marked days come in as [] and MArked days as {}
    const isMark = !Array.isArray(marking);
    //@ts-ignore
    const disabledMark = isMark && marking.disabled;
    // selected
    //@ts-ignore
    const selectedViewStyle = marking.selected && {
        backgroundColor: defaultDotColor
    };
    //@ts-ignore
    const selectedTextStyle = marking.selected && {
        color: defaultTextColor
    };
    const isInPastAndDisabled = disablePastDates && isPast(new Date(date.dateString));
    const isItToday = isToday(new Date(date.dateString));

    const markedDay = (isMark: any, marking: any) => {
        if (isMark) {
            if (marking.disabledWithNoMarker) {
                return "none";
            } else {
                return defaultDotColor;
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
                    <Text numberOfLines={2} style={{ textAlign: "center", fontSize: 8 }}>
                        {reducedRawDates.length} Events
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
                        paddingTop: "5%",
                        paddingBottom: "5%",
                        borderRadius: openCalendar ? 8 : 16,
                        paddingRight: isDayLong ? "20%" : "14%",
                        paddingLeft: isDayLong ? "20%" : "14%"
                    },
                    selectedViewStyle
                ]}
            >
                <Text
                    style={[
                        {
                            textAlign: "center",
                            color: isItToday
                                ? defaultDotColor
                                : state === "disabled" || disabledMark
                                ? "#DAE1E8"
                                : "black"
                        },
                        selectedTextStyle
                    ]}
                >
                    {date.day}
                </Text>
                {openCalendar && !isInPastAndDisabled && <View>{summarizeDay(date)}</View>}
                {!openCalendar && !isInPastAndDisabled && (
                    <View
                        style={{
                            height: 5,
                            width: 5,
                            backgroundColor: markedDay(isMark, marking),
                            borderRadius: 100 / 2
                        }}
                    ></View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CustomDay;
