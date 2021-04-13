import { NativeModules } from "react-native";

import { DarkModeOptionEnum } from "../../typings/CalendarNativeWidgetProps";

const isSystemDarkMode =
    NativeModules && NativeModules.RNDarkMode && NativeModules.RNDarkMode.initialMode
        ? NativeModules.RNDarkMode.initialMode === "dark"
        : false;
// TODO - Make User Changeable
export const DEFAULT_COLORS = {
    pureWhite: "#fff",
    white: "#ececec",
    black: "#141414",
    disableGrey: "#D9E1E8",
    disableGreyDark: "#242729",
    blue: "#2C97EB"
};
export const witchDarkMode = (darkModeOption: DarkModeOptionEnum): boolean => {
    let darkMode = false;
    switch (darkModeOption) {
        case "SYSTEM":
            darkMode = isSystemDarkMode;
            break;
        case "LIGHT":
            darkMode = false;
            break;
        case "DARK":
            darkMode = true;
            break;
    }
    return darkMode;
};
export const witchTheme = (darkModeOption: DarkModeOptionEnum) => {
    const darkMode = witchDarkMode(darkModeOption);
    const theme = {
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        monthTextColor: darkMode ? DEFAULT_COLORS.white : DEFAULT_COLORS.black,
        textDisabledColor: darkMode ? DEFAULT_COLORS.disableGreyDark : DEFAULT_COLORS.disableGrey,
        dayTextColor: darkMode ? DEFAULT_COLORS.disableGrey : DEFAULT_COLORS.black
    };
    return theme;
};
