import { createElement, ReactElement } from "react";
import { View, Text } from "react-native";
interface Props {
    direction: string;
    disableMonthChange: boolean;
}
const Arrows = ({ direction, disableMonthChange }: Props): ReactElement => {
    const arrowStyles = {
        fontSize: 30,
        color: "#2C97EB"
    };
    if (!disableMonthChange) {
        return (
            <View>
                {direction == "left" ? (
                    <Text style={[arrowStyles]}>{"<"}</Text>
                ) : (
                    <Text style={[arrowStyles]}>{">"}</Text>
                )}
            </View>
        );
    } else {
        return <View></View>;
    }
};

export default Arrows;
