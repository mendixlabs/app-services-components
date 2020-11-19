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

    // This is needed as Mon marked days come in as [] and MArked days as {}
    const isMark = !Array.isArray(marking);
    //@ts-ignore
    const disabledMark = isMark && marking.disabled;
    // selected
    //@ts-ignore
    // const selectedViewStyle = marking.selected && {
    //     backgroundColor: defaultDotColor
    // };
    //@ts-ignore
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
                    <Text numberOfLines={2} style={{ textAlign: "center", fontSize: 8, paddingTop: 2 }}>
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
                        width: "100%"
                    }
                ]}
            >
                <View
                    style={[
                        {
                            borderRadius: 100 / 2,
                            width: "60%",
                            padding: 5
                        },
                        selectedViewStyle
                    ]}
                >
                    <Text
                        style={[
                            {
                                // width: "100%",
                                textAlign: "center",
                                color: marking.selected
                                    ? "white"
                                    : isItToday
                                    ? defaultDotColor
                                    : state === "disabled" || disabledMark
                                    ? "#DAE1E8"
                                    : "black"
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
                            // marginTop: 2,
                            backgroundColor: markedDay(isMark, marking)
                        }}
                    ></View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CustomDay;
