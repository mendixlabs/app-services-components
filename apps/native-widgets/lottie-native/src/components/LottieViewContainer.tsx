/* eslint-disable radix */
import { ReactElement, createElement, FC, Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import { LottieViewContainerTypes } from "src/utils/Types";

const LottieViewContainer: FC<LottieViewContainerTypes> = (props): ReactElement => {
    const { height, width } = useWindowDimensions();
    return (
        <Fragment>
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
                {props.children}
            </View>
        </Fragment>
    );
};

export default LottieViewContainer;
