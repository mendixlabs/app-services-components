/* eslint-disable radix */
import { createElement, ReactElement, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { playAnimationSegments } from "../utils/helpers";
// Hooks
import { useDynamicValue, useEditableValue } from "@appservicescomponents/usemendix";

// TYPES
import type { ControlledPlayingTypes } from "src/utils/Types";

const ControlledPlaying = (props: ControlledPlayingTypes): ReactElement => {
    const [frameToStartValue, frameToStartState] = useDynamicValue(props.frameToStart);
    const [frameToEndValue, frameToEndState] = useDynamicValue(props.frameToEnd);
    const [loopAnimationValue, loopAnimationState] = useDynamicValue(props.loopAnimation);
    const [playPauseValue, playPauseState, playPauseMethods] = useEditableValue<boolean>(props.pausePlay);

    const animation = useRef<LottieView>(null);

    // We use this to play pause the Animation to not cause sudden Pauses
    useEffect(() => {
        if (playPauseValue) {
            // Play Animation
            animation.current?.play();
        }
    }, [playPauseValue]);

    // Using this as a Psudo While Loop -> We control everything in here so that we can pause and play without causing jumps in the animation
    const onAnimationFinish = (isCancelled: boolean): void => {
        if (!isCancelled) {
            playAnimationSegments(frameToStartValue as number, frameToEndValue as number, animation);
            if (!loopAnimationValue) {
                // If not loop - we set loop to false
                animation.current?.pause();
                playPauseMethods.setValue(false);
            }
            if (!playPauseValue) {
                animation.current?.pause();
            }
        }
    };

    // We must wait for Play pause to come in to kn
    if (
        playPauseState.isLoading ||
        frameToStartState.isLoading ||
        frameToEndState.isLoading ||
        loopAnimationState.isLoading
    ) {
        // @ts-ignore
        return <View></View>;
    }
    return (
        // @ts-ignore
        <LottieView
            testID="lottieAnimaterView"
            ref={animation}
            resizeMode="cover"
            speed={1}
            onAnimationFinish={onAnimationFinish}
            source={props.parsedAnimation}
            loop={false}
            autoPlay={false}
            style={{
                flex: 1,
                padding: 0,
                margin: 0
            }}
        />
    );
};

export default ControlledPlaying;
