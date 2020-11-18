import { createElement, cloneElement, useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { Style } from "@mendix/pluggable-widgets-tools";
import GestureRecognizer from "react-native-swipe-gestures";

import Arrows from "./Arrows";
import CustomDay from "./CustomDay";

import { format, eachWeekendOfMonth, isSunday, isSaturday } from "date-fns";
// import * as R from "ramda";
// import { Image } from "mendix/components/native/Image";

import { CalendarNativeWidgetProps } from "../../typings/CalendarNativeWidgetProps";

const DATE_FORMAT = "yyy-MM-dd";

type ExcludedCalendarNativeWidgetProps = Omit<CalendarNativeWidgetProps<Style>, "name" | "style">;

const CalendarInit = ({
    date,
    title,
    dotColor,
    description,
    volatileDate,
    incomingDates,
    selectedColor,
    activeSwipeDown,
    disableWeekends,
    autoTriggerAction,
    selectedTextColor
}: ExcludedCalendarNativeWidgetProps) => {
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>();
    const [rawInComingDates, setRawInComingDates] = useState<any>();
    const [inComingDates, setInComingDates] = useState<any>({ weekends: null, appDates: null });
    const [weekends, setWeekends] = useState<any>();

    console.log("rawInComingDates", rawInComingDates, openCalendar);
    const defaultDotColor: string = dotColor ? dotColor : "#05bedb";
    const defaultTextColor: string = selectedTextColor ? selectedTextColor : "white";
    const defaultSelectedColor: string = selectedColor ? selectedColor : "05bedb";
    useEffect(() => {
        /**
         * Resets Selected Day If a Event Was Added
         */
        setSelected("");
        _parseIncomingDates();
        disableWeekends && _disableWeekends();
    }, [incomingDates]);
    const onMonthChange = (month: any) => {
        const dateObject = new Date(month.timestamp);
        _disableWeekends(dateObject);
    };
    const _disableWeekends = (newMonth?: any) => {
        const current = Date.now();
        const aMonthfromDate = newMonth ? eachWeekendOfMonth(newMonth) : eachWeekendOfMonth(current);

        const dissabledWeekends =
            aMonthfromDate &&
            aMonthfromDate.reduce((a, c) => {
                const formattedDate = format(new Date(c), DATE_FORMAT);
                const day = {
                    ...a,
                    [formattedDate]: {
                        disabled: true,
                        disabledWithNoMarker: true
                    }
                };
                return day;
            }, []);

        setWeekends(dissabledWeekends);
    };
    const _triggerEvent = async (day?: string) => {
        /**
         * This could be done Cleaner on Refactor
         */
        if (volatileDate) {
            if (!day && selected) {
                const dateObject = new Date(selected);
                await volatileDate.setValue(dateObject);
            }
            if (day) {
                const dateObject = new Date(day);
                console.log("dateObject", dateObject);
                await volatileDate.setValue(dateObject);
            }
        }
    };

    const onDayPress = async (day: any) => {
        const dateObject = new Date(day.dateString);
        // TODO Disable by user
        if (disableWeekends && (isSunday(dateObject) || isSaturday(dateObject))) {
            await setSelected("");
            return;
        }
        await setSelected(day.dateString);
        if (volatileDate && autoTriggerAction) {
            await _triggerEvent(day.dateString);
        }
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
            setRawInComingDates(destructedValues);
            _formatIncomingDates(destructedValues);
        }
    };

    const _formatIncomingDates = async (destructedValues: any) => {
        if (destructedValues) {
            const formattedDates = await destructedValues?.reduce((a: any, c: any) => {
                const r = {
                    ...a,
                    [c.formattedDate]: {
                        marked: true,
                        dotColor: defaultDotColor
                        // multiDay: true
                    }
                };
                return r;
            }, []);

            await setInComingDates(formattedDates);
        }
    };

    function onSwipe(gestureName: any) {
        // const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {
            case "SWIPE_UP":
                setOpenCalendar(false);
                break;
            case "SWIPE_DOWN":
                setOpenCalendar(true);

                break;
        }
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    // console.log("inComingDates", inComingDates);

    const rendererForActiveSwipeDown = activeSwipeDown
        ? {
              dayComponent: (day: any) => (
                  <CustomDay
                      day={day}
                      defaultDotColor={defaultDotColor}
                      defaultTextColor={defaultTextColor}
                      onDayPress={onDayPress}
                      rawInComingDates={rawInComingDates}
                      openCalendar={openCalendar}
                  />
              )
          }
        : {};
    return (
        <View>
            <GestureRecognizer onSwipe={direction => onSwipe(direction)} config={config}>
                {cloneElement(
                    <Calendar
                        current={Date.now()}
                        hideArrows={false}
                        renderArrow={(direction: string) => <Arrows direction={direction} />}
                        enableSwipeMonths={true}
                        hideExtraDays={true}
                        onDayPress={onDayPress}
                        markedDates={{
                            ...inComingDates,
                            // @ts-ignore
                            [selected]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedColor: defaultSelectedColor,
                                selectedTextColor: defaultTextColor
                            },
                            ...weekends
                        }}
                        onMonthChange={month => {
                            disableWeekends && onMonthChange(month);
                        }}
                    />,
                    { ...rendererForActiveSwipeDown }
                )}
            </GestureRecognizer>
            {!autoTriggerAction && <Button title="Add Event" onPress={() => _triggerEvent()} disabled={!selected} />}
        </View>
    );
};

export default CalendarInit;

// const formattedDates = destructedValues?.map((date: any) => {
//     return {
//         [date.formattedDate]: { marked: true }
//     };
// });
{
    /* {!R.isEmpty(inComingDates) && ( */
}
// <Calendar
// @ts-ignore
// disabledDaysIndexes={[0, 6]}
// minDate={Date.now()}

//   style={styles.calendar}

// markingType={"multi-dot"}

// dayComponent={day => {
//     const { marking, date, state } = day;
//     // Styling needs to change if date is 1 char or 2
//     const isDayLong = date.day <= 9;
//     // This is needed as Mon marked days come in as [] and MArked days as {}
//     const isMark = !Array.isArray(marking);
//     //@ts-ignore
//     const disabledMark = isMark && marking.disabled;
//     // selected
//     //@ts-ignore
//     const x = marking.selected && {
//         backgroundColor: defaultDotColor
//     };
//     //@ts-ignore
//     const p = marking.selected && {
//         color: defaultTextColor
//     };
//     return (
//         <TouchableWithoutFeedback
//             onPress={() => {
//                 console.log("disabledMark", isMark, disabledMark);
//                 !disabledMark && onDayPress(date);
//             }}
//         >
//             <View
//                 style={[
//                     {
//                         justifyContent: "center",
//                         alignItems: "center",
//                         paddingTop: "5%",
//                         paddingBottom: "5%",
//                         borderRadius: openCalendar ? 8 : 16,
//                         paddingRight: isDayLong ? "20%" : "14%",
//                         paddingLeft: isDayLong ? "20%" : "14%"
//                     },
//                     x
//                 ]}
//             >
//                 <Text
//                     style={[
//                         {
//                             textAlign: "center",
//                             color: state === "disabled" || disabledMark ? "gray" : "black"
//                         },
//                         p
//                     ]}
//                 >
//                     {date.day}
//                 </Text>
//                 {openCalendar && <View>{summerizeDay(date)}</View>}
//                 {!openCalendar && (
//                     <View
//                         style={{
//                             height: 5,
//                             width: 5,
//                             backgroundColor: markedDay(isMark, marking),
//                             borderRadius: 100 / 2
//                         }}
//                     ></View>
//                 )}
//             </View>
//         </TouchableWithoutFeedback>
//     );
// }}
// />
{
    /* )} */
}
