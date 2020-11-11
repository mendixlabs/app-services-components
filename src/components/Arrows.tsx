import { createElement, ReactElement } from "react";
import { View, Text } from "react-native";
interface Props {
    direction: string;
}
const Arrows = ({ direction }: Props): ReactElement => {
    console.log("direction", direction);
    return <View>{direction == "left" ? <Text>{"<"}</Text> : <Text>{">"}</Text>}</View>;
};

export default Arrows;
