import { Style } from "@mendix/pluggable-widgets-tools";
// import { ViewStyle } from "react-native";

export interface CollapsibleHeaderStyle extends Style {
    // container: ViewStyle;
    header: {
        backgroundColor?: string;
        minHeight?: number;
        maxHeight?: number;
    };
}

export const defaultCollapsibleHeaderStyle: CollapsibleHeaderStyle = {
    // container: {
    //     flex: 1,
    //     minHeight: 100,
    //     flexDirection: "column"
    // },
    header: {
        backgroundColor: "rgba(200, 200, 200, 1)",
        minHeight: 50,
        maxHeight: 200
    }
};
