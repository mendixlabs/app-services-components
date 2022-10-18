import { createElement, Fragment, useReducer, useRef, useEffect, useState, ReactElement, useMemo } from "react";
import { TextStyle, ViewStyle, Animated, View, TouchableWithoutFeedback } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { ExpandTextProps } from "../typings/ExpandTextProps";
import { useDynamicValue } from "@appservicescomponents/usemendix";
import { OffScreenRender } from "./components/OffScreenRender";
import { DisplayText, Ran_State } from "./components/DisplayText";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function ExpandText({
    readLess,
    longText,
    readMore,
    toAnimate,
    showReadMore,
    showReadLess,
    numberOfLines
}: ExpandTextProps<CustomStyle>): ReactElement {
    const numberOfLinesParsed = useMemo(
        () => parseInt(numberOfLines.value?.toFixed(0) || "0", 10),
        [numberOfLines.value]
    );

    const [textEndHeight, setTextEndHeight] = useState(0);
    const [textStartHeight, setTextStartHeight] = useState(0);
    const [disableReadMore, setDisableReadMore] = useState<boolean>(false);

    const [textState, setTextState] = useState<Ran_State>(Ran_State.NEVER_RAN);

    const [textValue, { isLoading }] = useDynamicValue(longText);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Set if Text is collapsed or not
    const [isOpen, toggleIsOpen] = useReducer(state => {
        return !state;
    }, false);

    const bodyHeight = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [textStartHeight, textEndHeight]
    });

    useEffect(() => {
        if (isOpen) {
            setTextState(Ran_State.OPEN);
            Animated.timing(fadeAnim, {
                duration: 250,
                useNativeDriver: false,
                toValue: 1
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                duration: 250,
                useNativeDriver: false,
                toValue: 0
            }).start(() => {
                setTextState(Ran_State.CLOSED);
            });
        }
    }, [isOpen]);

    if (isLoading) {
        return <Fragment></Fragment>;
    }

    if (toAnimate) {
        return (
            <Fragment>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (!disableReadMore) {
                            toggleIsOpen();
                        }
                    }}
                >
                    <View>
                        <OffScreenRender
                            readMore={readMore}
                            displayText={textValue}
                            showReadMore={showReadMore}
                            showReadLess={showReadLess}
                            lineNumbers={numberOfLinesParsed}
                            setTextEndHeight={setTextEndHeight}
                            setTextStartHeight={setTextStartHeight}
                            setDisableReadMore={setDisableReadMore}
                        />
                        <DisplayText
                            reaLess={readLess}
                            readMore={readMore}
                            textState={textState}
                            displayText={textValue}
                            showReadMore={showReadMore}
                            showReadLess={showReadLess}
                            lineNumbers={numberOfLinesParsed}
                            disableReadMore={disableReadMore}
                            setDisableReadMore={setDisableReadMore}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Fragment>
        );
    }

    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    if (!disableReadMore) {
                        toggleIsOpen();
                    }
                }}
            >
                <Animated.View
                    style={{
                        height: bodyHeight,
                        overflow: "hidden"
                    }}
                >
                    <OffScreenRender
                        readMore={readMore}
                        displayText={textValue}
                        showReadMore={showReadMore}
                        showReadLess={showReadLess}
                        lineNumbers={numberOfLinesParsed}
                        setTextEndHeight={setTextEndHeight}
                        setTextStartHeight={setTextStartHeight}
                        setDisableReadMore={setDisableReadMore}
                    />
                    <DisplayText
                        reaLess={readLess}
                        readMore={readMore}
                        textState={textState}
                        displayText={textValue}
                        showReadMore={showReadMore}
                        showReadLess={showReadLess}
                        disableReadMore={disableReadMore}
                        lineNumbers={numberOfLinesParsed}
                        setDisableReadMore={setDisableReadMore}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}
