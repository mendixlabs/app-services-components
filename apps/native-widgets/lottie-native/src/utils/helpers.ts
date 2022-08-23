import LottieView from "lottie-react-native";
import React from "react";

const CLOSE_TO_INFINITY = Math.pow(10, 99);
export function playAnimationSegments(
    frameToEndValue: number,
    frameToStartValue: number,
    animation: React.RefObject<LottieView>
): void {
    if (frameToEndValue === frameToStartValue) {
        // cant Use `reset` as that causes inf loop
        // animation.current?.play(0, -1);
        animation.current?.play(0, CLOSE_TO_INFINITY); // -1 works in ios but not android
    } else {
        animation.current?.play(frameToStartValue as number, frameToEndValue as number);
    }
}
