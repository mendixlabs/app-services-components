import { createElement } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
interface CustomPayProps {
    day: any;
    defaultDotColor: any;
    defaultTextColor: any;
    onDayPress: any;
    rawInComingDates: any;
    openCalendar: any;
}
const CustomDay = ({
    day,
    defaultDotColor,
    defaultTextColor,
    onDayPress,
    rawInComingDates,
    openCalendar
}: CustomPayProps) => {
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

    const summerizeDay = (day: any) => {
        if (day && rawInComingDates) {
            const reducedRawDates = rawInComingDates.reduce((a: any, c: any) => {
                if (c.formattedDate === day.dateString) {
                    return [...a, c];
                } else {
                    return a;
                }
            }, []);
            if (reducedRawDates.length) {
                console.log("reducedRawDates", reducedRawDates);
                return (
                    <Text numberOfLines={2} style={{ textAlign: "center", fontSize: 10 }}>
                        {reducedRawDates.length} Events
                    </Text>
                );
            }
        }
    };

    const { marking, date, state } = day;
    // Styling needs to change if date is 1 char or 2
    const isDayLong = date.day <= 9;
    // This is needed as Mon marked days come in as [] and MArked days as {}
    const isMark = !Array.isArray(marking);
    //@ts-ignore
    const disabledMark = isMark && marking.disabled;
    // selected
    //@ts-ignore
    const x = marking.selected && {
        backgroundColor: defaultDotColor
    };
    //@ts-ignore
    const p = marking.selected && {
        color: defaultTextColor
    };
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                !disabledMark && onDayPress(date);
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
                    x
                ]}
            >
                <Text
                    style={[
                        {
                            textAlign: "center",
                            color: state === "disabled" || disabledMark ? "gray" : "black"
                        },
                        p
                    ]}
                >
                    {date.day}
                </Text>
                {openCalendar && <View>{summerizeDay(date)}</View>}
                {!openCalendar && (
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
