import { createElement, Fragment, ReactElement, useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { SequenceType } from "typings/LottieNativeProps";
import { playAnimationSegments } from "../utils/helpers";
import { AnimationObject } from "src/utils/Types";

type SequentialPlayingTypes = {
    sequence: SequenceType[];
    parsedAnimation: AnimationObject;
};

const SequentialPlaying = (props: SequentialPlayingTypes): ReactElement => {
    const animation = useRef<LottieView>(null);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(0);
    const currentSegment = props.sequence[currentSegmentIndex];
    // Start Animation
    useEffect(() => {
        animation.current?.play(currentSegment.startFrame, currentSegment.endFrame);
    }, []);

    // Using this as a Psudo While Loop
    const onAnimationFinish = (isCancelled: boolean): void => {
        // If current has Loop Set we just replay the segments
        if (!isCancelled) {
            if (currentSegment.onDoneAction?.canExecute) {
                currentSegment.onDoneAction.execute();
            }
            if (currentSegment.loop && currentSegmentIndex === props.sequence.length - 1) {
                return playAnimationSegments(currentSegment.startFrame, currentSegment.endFrame, animation);
            }
            if (currentSegmentIndex < props.sequence.length - 1) {
                const newIndex = currentSegmentIndex + 1;
                const newSegmentIndex = props.sequence[newIndex];
                playAnimationSegments(newSegmentIndex.startFrame, newSegmentIndex.endFrame, animation);
                setCurrentSegmentIndex(newIndex);
            }
        }
    };
    return (
        <Fragment>
            <LottieView
                testID="lottieAnimaterView"
                ref={animation}
                resizeMode="cover"
                onAnimationFinish={onAnimationFinish}
                source={props.parsedAnimation}
                loop={false}
                autoPlay
                style={{
                    flex: 1,
                    padding: 0,
                    margin: 0
                }}
            />
        </Fragment>
    );
};

export default SequentialPlaying;
