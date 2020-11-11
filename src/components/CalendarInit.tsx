import { createElement, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Style } from "@mendix/pluggable-widgets-tools";

import Arrows from "./Arrows";

import { format } from "date-fns";
import * as R from "ramda";
// import { Image } from "mendix/components/native/Image";

import { CalendarNativeWidgetProps } from "../../typings/CalendarNativeWidgetProps";

const DATE_FORMAT = "yyy-MM-dd";

type ExcludedCalendarNativeWidgetProps = Omit<CalendarNativeWidgetProps<Style>, "name" | "style">;

const CalendarInit = ({
    incomingDates,
    description,
    title,
    date,
    selectedColor,
    selectedTextColor,
    dotColor
}: ExcludedCalendarNativeWidgetProps) => {
    const [selected, setSelected] = useState();
    const [inComingDates, setInComingDates] = useState({});
    useEffect(() => {
        _parseIncomingDates();
    }, [incomingDates]);
    const onDayPress = (day: any) => {
        console.log("day", day);
        setSelected(day.dateString);
    };
    const _parseIncomingDates = () => {
        if (incomingDates) {
            const destructedValues = incomingDates.items?.map((item: any) => {
                const titleValue = title(item);
                const descriptionValue = description(item);
                const dateValue = date(item);
                const formattedDate = format(new Date(dateValue.displayValue), DATE_FORMAT);

                return {
                    titleValue,
                    descriptionValue,
                    dateValue,
                    formattedDate
                };
            });
            // console.log("setSelected", destructedValues);
            _formatIncomingDates(destructedValues);
        }
    };
    const _formatIncomingDates = (destructedValues: any) => {
        if (destructedValues) {
            console.log("destructedValues", destructedValues);

            const formattedDates = destructedValues?.reduce(
                (a: any, c: any) => {
                    const r = {
                        ...a,
                        [c.formattedDate]: { marked: true, dotColor: dotColor ? dotColor : "red", multiDay: true }
                    };
                    return r;
                },
                { "2020-11-18": { marked: true, dotColor: "red", activeOpacity: 0 } }
            );
            setInComingDates(formattedDates);
        }
    };
    // @ts-ignore
    console.log("inComingDates", inComingDates, R.isEmpty(inComingDates));
    // _parseIncomingDates();
    return (
        <View>
            <Text>CalendarInit</Text>
            {/* <Image source="https://avatars1.githubusercontent.com/u/29273599?s=400&v=4" style={{ fill: "blue" }} /> */}
            {/* <Icon
                icon={{
                    type: "image",
                    iconUrl: ""
                }}
                size={20}
                color="blue"
            /> */}

            {!R.isEmpty(inComingDates) && (
                <Calendar
                    // @ts-ignore
                    disabledDaysIndexes={[0, 6]}
                    current={"2020-11-16"}
                    //   style={styles.calendar}
                    // hideExtraDays
                    hideArrows={false}
                    // markingType={"multi-dot"}
                    onDayPress={onDayPress}
                    renderArrow={direction => <Arrows direction={direction} />}
                    markedDates={{
                        ...inComingDates,
                        // @ts-ignore
                        [selected]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: selectedColor ? selectedColor : "orange",
                            selectedTextColor: selectedTextColor ? selectedTextColor : "red"
                        }
                    }}
                    // dayComponent={x => {
                    //     console.log("date", x);
                    //     // console.log("state", state);
                    //     return (
                    //         <View>
                    //             <Text style={{ textAlign: "center", color: x.state === "disabled" ? "gray" : "black" }}>
                    //                 {x.date.day}
                    //             </Text>
                    //             <Text style={{ textAlign: "center", fontSize: 8 }}>7 Events</Text>
                    //         </View>
                    //     );
                    // }}
                />
            )}
        </View>
    );
};

export default CalendarInit;

// const formattedDates = destructedValues?.map((date: any) => {
//     return {
//         [date.formattedDate]: { marked: true }
//     };
// });
