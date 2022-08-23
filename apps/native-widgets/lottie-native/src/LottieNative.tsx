/* eslint-disable radix */
import { ReactElement, createElement, Fragment, useEffect, useState } from "react";
import { ValueStatus } from "mendix";

import LottieViewContainer from "./components/LottieViewContainer";
import SequentialPlaying from "./components/SequentialPlaying";
import ControlledPlaying from "./components/ControlledPlaying";

import type { LottieNativeProps } from "typings/LottieNativeProps";
import type { AnimationObject, CustomStyle } from "./utils/Types";

export function LottieNative(props: LottieNativeProps<CustomStyle>): ReactElement {
    const [parsedAnimation, setParsedAnimation] = useState<AnimationObject | null>(null);
    useEffect(() => {
        if (props.animationJson.status === ValueStatus.Available) {
            setParsedAnimation(JSON.parse(props.animationJson.value));
        }
    }, [props.animationJson]);

    if (parsedAnimation) {
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
    } else {
        // Loading State
        return <Fragment></Fragment>;
    }
    // Loading State
    return <Fragment></Fragment>;
}
