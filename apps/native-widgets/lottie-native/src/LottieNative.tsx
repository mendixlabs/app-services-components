/* eslint-disable radix */
import { ReactElement, createElement, useRef } from "react";
import { TextStyle, ViewStyle, View, useWindowDimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Style } from "@mendix/pluggable-widgets-tools";
import { LottieNativeProps } from "typings/LottieNativeProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}
export function LottieNative(props: LottieNativeProps<CustomStyle>): ReactElement {
    const { height, width } = useWindowDimensions();

    const animation = useRef<LottieView>(null);
    const parsedAnimation = JSON.parse(props.animationJson);

    return (
        <View
            testID="lottieContainerView"
            style={{
                padding: 0,
                margin: 0,
                width: props.width === "full" ? width : parseInt(props.width),
                height: props.height === "full" ? height : parseInt(props.height),
                position: props.isBackground ? "absolute" : "relative"
            }}
        >
            <LottieView
                testID="lottieAnimaterView"
                ref={animation}
                resizeMode="cover"
                source={parsedAnimation}
                loop={props.loopAnimation}
                autoPlay={props.autoPlayAnimation}
                style={{
                    flex: 1,
                    padding: 0,
                    margin: 0
                }}
            />
        </View>
    );
}
