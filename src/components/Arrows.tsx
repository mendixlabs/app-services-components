import { createElement, ReactElement } from "react";
import { View, Text } from "react-native";
interface Props {
    direction: string;
    defaultDotColor: string;
    disableMonthChange: boolean;
}
const Arrows = ({ direction, disableMonthChange, defaultDotColor }: Props): ReactElement => {
    const arrowStyles = {
        fontSize: 20,
        color: defaultDotColor
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
