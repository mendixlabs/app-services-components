/* eslint-disable radix */
import { ReactElement, createElement, Fragment } from "react";

import LottieViewContainer from "./components/LottieViewContainer";
import SequentialPlaying from "./components/SequentialPlaying";
import ControlledPlaying from "./components/ControlledPlaying";

import type { LottieNativeProps } from "typings/LottieNativeProps";
import type { AnimationObject, CustomStyle } from "./utils/Types";

export function LottieNative(props: LottieNativeProps<CustomStyle>): ReactElement {
    const parsedAnimation: AnimationObject = JSON.parse(props.animationJson);

    if (props.playMode === "sequential") {
        return (
            <LottieViewContainer width={props.width} height={props.height} isBackground={props.isBackground}>
                <SequentialPlaying sequence={props.sequence} parsedAnimation={parsedAnimation} />
            </LottieViewContainer>
        );
    }
    if (props.playMode === "controlled") {
        return (
            <LottieViewContainer width={props.width} height={props.height} isBackground={props.isBackground}>
                <ControlledPlaying
                    parsedAnimation={parsedAnimation}
                    frameToStart={props.frameToStart}
                    frameToEnd={props.frameToEnd}
                    loopAnimation={props.loopAnimation}
                    pausePlay={props.pausePlay}
                />
            </LottieViewContainer>
        );
    }
    return <Fragment></Fragment>;
}

// ::TODO:: change loopAnimation and autoPlayAnimation to dynamic values
