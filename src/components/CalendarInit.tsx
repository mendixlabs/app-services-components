import { createElement, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarInit = () => {
    const [selected, setSelected] = useState();
    const onDayPress = (day: any) => {
        setSelected(day.dateString);
    };
    return (
        <View>
            <Text>CalendarInit</Text>
            <Calendar
                current={"2020-02-02"}
                //   style={styles.calendar}
                hideExtraDays
                onDayPress={onDayPress}
                markedDates={{
                    // @ts-ignore
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: "orange",
                        selectedTextColor: "red"
                    }
                }}
            />
        </View>
    );
};

export default CalendarInit;
