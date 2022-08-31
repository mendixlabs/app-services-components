import React, { ReactElement, createElement, Fragment, useCallback } from "react";

import { Text, View, useWindowDimensions } from "react-native";

type OffScreenRender = {
    readMore: React.ReactNode;
    lineNumbers: number;
    displayText: string;
    showReadMore: boolean;
    showReadLess: boolean;
    setTextStartHeight: React.Dispatch<React.SetStateAction<number>>;
    setTextEndHeight: React.Dispatch<React.SetStateAction<number>>;
    setDisableReadMore: React.Dispatch<React.SetStateAction<boolean>>;
};
export const OffScreenRender = (props: OffScreenRender): ReactElement => {
    const { width, height } = useWindowDimensions();
    const onTextLayout = useCallback(e => {
        if (e.nativeEvent.lines.length === props.lineNumbers) {
            props.setDisableReadMore(true);
        }
    }, []);

    return (
        <Fragment>
            <View style={{ position: "absolute", top: height * 3, left: width * 3 }}>
                <Text
                    numberOfLines={props.showReadMore ? props.lineNumbers + 1 : props.lineNumbers}
                    onLayout={event => {
                        props.setTextStartHeight(event.nativeEvent.layout.height);
                    }}
                >
                    {props.displayText}
                </Text>
                <View
                    onLayout={event => {
                        props.setTextEndHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <Text onTextLayout={onTextLayout}>{props.displayText}</Text>
                    {props.showReadLess && <Text style={{ fontWeight: "bold" }}>{props.readMore}</Text>}
                </View>
            </View>
        </Fragment>
    );
};
