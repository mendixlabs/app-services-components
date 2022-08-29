import { ReactElement, createElement } from "react";
import { Text, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CustomStyle } from "../ExpandText";

export interface HelloWorldProps {
    name?: string;
    style: CustomStyle[];
}

const defaultStyle: CustomStyle = {
    container: {},
    label: {
        color: "#F6BB42"
    }
};

export function HelloWorld({ name, style }: HelloWorldProps): ReactElement {
    const styles = mergeNativeStyles(defaultStyle, style);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Hello {name || "World"}</Text>
        </View>
    );
}
