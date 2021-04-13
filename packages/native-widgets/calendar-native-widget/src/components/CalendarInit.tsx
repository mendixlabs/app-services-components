import { createElement, Fragment, cloneElement, useState, useEffect, ReactElement } from "react";
import { View, Button } from "react-native";
import { Calendar, DateObject } from "react-native-calendars";
import { Style } from "@mendix/pluggable-widgets-tools";
import GestureRecognizer from "react-native-swipe-gestures";
import { format, isPast, eachWeekendOfMonth, isSunday, isSaturday, addMonths } from "date-fns";

// Custom Components
import Arrows from "./Arrows";
import CustomDay from "./CustomDay";
// Types
import { CalendarNativeWidgetProps } from "../../typings/CalendarNativeWidgetProps";
//Utils
import { witchTheme, DEFAULT_COLORS } from "../utils/theme";

const DATE_FORMAT = "yyy-MM-dd";

type ExcludedCalendarNativeWidgetProps = Omit<CalendarNativeWidgetProps<Style>, "name" | "style">;

enum DAYS_OF_THE_WEEK {
    SUNDAY = 0,
    MONDAY
}

const CalendarInit = ({
    date,
    dotColor,
    buttonText,
    startOfWeek,
    initialDate,
    isActiveDate,
    volatileDate,
    propertyName,
    incomingDates,
    selectedColor,
    darkModeOption,
    activeSwipeDown,
    disableWeekends,
    disablePastDates,
    autoTriggerAction,
    selectedTextColor,
    disableMonthChange,
    takeIsActiveIntoAccount
}: ExcludedCalendarNativeWidgetProps): ReactElement => {
    const NOT_PROVIDED = "notProvided";
    const [weekends, setWeekends] = useState<any>();
    const [startDate, setStartDate] = useState<Date>();
    const [selected, setSelected] = useState<string>();
    const [rawInComingDates, setRawInComingDates] = useState<any>();
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [inComingDates, setInComingDates] = useState<any>({ weekends: null, appDates: null });

    const defaultDotColor: string = dotColor ? dotColor : DEFAULT_COLORS.blue;
    const defaultTextColor: string = selectedTextColor ? selectedTextColor : DEFAULT_COLORS.white;
    const defaultSelectedColor: string = selectedColor ? selectedColor : DEFAULT_COLORS.blue;

    const _disableWeekends = (newMonth?: any) => {
        if (startDate) {
            const aMonthFromDate = newMonth ? eachWeekendOfMonth(newMonth) : eachWeekendOfMonth(startDate);
            const disabledWeekends =
                aMonthFromDate &&
                aMonthFromDate.reduce((a, c) => {
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
            setWeekends(disabledWeekends);
        }
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
                await volatileDate.setValue(dateObject);
            }
        }
    };
    const isDateDisabled = (c: any) => {
        if (c.isActiveDateValue === NOT_PROVIDED) {
            return false;
        }
        if (takeIsActiveIntoAccount) {
            return !c.isActiveDateValue.value;
        } else {
            return false;
        }
    };
    const _formatIncomingDates = async (destructedValues: any) => {
        if (destructedValues) {
            const formattedDates = await destructedValues?.reduce((a: any, c: any) => {
                const isInPastAndDisabled = disablePastDates && isPast(new Date(c.formattedDate));
                if (!isInPastAndDisabled) {
                    const internalDate = {
                        ...a,
                        [c.formattedDate]: {
                            marked: true,
                            disabled: isDateDisabled(c),
                            dotColor: defaultDotColor
                        }
                    };
                    return internalDate;
                }
            }, []);

            await setInComingDates(formattedDates);
        }
    };
    const _parseIncomingDates = () => {
        if (incomingDates) {
            const destructedValues = incomingDates.items?.map((item: any) => {
                const dateValue = date(item);
                const isActiveDateValue = isActiveDate ? isActiveDate(item) : NOT_PROVIDED;
                const formattedDate = format(dateValue.value as Date, DATE_FORMAT);
                return {
                    dateValue,
                    formattedDate,
                    isActiveDateValue
                };
            });
            setRawInComingDates(destructedValues);
            _formatIncomingDates(destructedValues);
        }
    };

    useEffect(() => {
        setStartDate(addMonths(Date.now(), initialDate));
    }, []);
    useEffect(() => {
        /**
         * Resets Selected Day If a Event Was Added
         */
        setSelected("");
        _parseIncomingDates();
        disableWeekends && _disableWeekends();
    }, [incomingDates]);
    const onMonthChange = (month: DateObject) => {
        const dateObject = new Date(month.timestamp);
        if (disableWeekends) {
            _disableWeekends(dateObject);
        } else {
            _parseIncomingDates();
        }
    };

    const onDayPress = async (day: any) => {
        const dateObject = new Date(day.dateString);

        if (disableWeekends && (isSunday(dateObject) || isSaturday(dateObject))) {
            await setSelected("");
            return;
        }
        await setSelected(day.dateString);
        if (volatileDate && autoTriggerAction) {
            await _triggerEvent(day.dateString);
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
    /**
     *  This is done (with the Clone Element) to be able to pass Conditional Props to the Calendar Components
     * This Helps so that we can keep the CORE Calendar Module with out the need to Fork from Github
     */
    const rendererForActiveSwipeDown = activeSwipeDown
        ? {
              dayComponent: (day: any) => (
                  <CustomDay
                      day={day}
                      onDayPress={onDayPress}
                      propertyName={propertyName}
                      openCalendar={openCalendar}
                      darkModeOption={darkModeOption}
                      defaultDotColor={defaultDotColor}
                      disablePastDates={disablePastDates}
                      rawInComingDates={rawInComingDates}
                      defaultTextColor={defaultTextColor}
                  />
              )
          }
        : {};
    const rendererForMinDate = disablePastDates
        ? {
              minDate: Date.now()
          }
        : {};
    const rendererForTheme = {
        theme: witchTheme(darkModeOption)
    };

    return (
        <View>
            {startDate && (
                <Fragment>
                    <GestureRecognizer
                        config={config}
                        style={{ paddingBottom: 10 }}
                        onSwipe={direction => onSwipe(direction)}
                    >
                        {cloneElement(
                            <Calendar
                                current={startDate}
                                hideArrows={false}
                                hideExtraDays={false}
                                onDayPress={onDayPress}
                                disableArrowLeft={disableMonthChange}
                                disableArrowRight={disableMonthChange}
                                disableMonthChange={disableMonthChange}
                                firstDay={DAYS_OF_THE_WEEK[startOfWeek]}
                                markedDates={{
                                    ...inComingDates,
                                    // @ts-ignore
                                    [selected]: {
                                        selected: true,
                                        userSelected: true,
                                        disableTouchEvent: true,
                                        selectedColor: defaultSelectedColor,
                                        selectedTextColor: defaultTextColor
                                    },
                                    ...weekends
                                }}
                                renderArrow={(direction: string) => (
                                    <Arrows
                                        direction={direction}
                                        defaultDotColor={defaultDotColor}
                                        disableMonthChange={disableMonthChange}
                                    />
                                )}
                                onMonthChange={month => {
                                    onMonthChange(month);
                                }}
                            />,
                            { ...rendererForActiveSwipeDown, ...rendererForMinDate, ...rendererForTheme }
                        )}
                    </GestureRecognizer>
                    {!autoTriggerAction && (
                        <Button title={buttonText} onPress={() => _triggerEvent()} disabled={!selected} />
                    )}
                </Fragment>
            )}
        </View>
    );
};

export default CalendarInit;
