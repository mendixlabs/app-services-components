import React, { ReactElement, createElement, Fragment } from "react";

import { Text, View } from "react-native";
import { TextAlignEnum } from "typings/ExpandTextProps";

type DisplyTextType = {
    textState: Ran_State;
    lineNumbers: number;
    readMore: string;
    reaLess: string;
    displayText: string;
    showReadMore: boolean;
    showReadLess: boolean;
    disableReadMore: boolean;
    textAlign: TextAlignEnum;
    setDisableReadMore: React.Dispatch<React.SetStateAction<boolean>>;
};

type ConDis_DisplyType = {
    lineNumber: number;
    showText: boolean;
    displayText: string;
};

export enum Ran_State {
    NEVER_RAN,
    OPEN,
    CLOSED
}

export const DisplayText = (props: DisplyTextType): ReactElement => {
    // Animation Figures this out automagically

    const textState = (): ConDis_DisplyType => {
        switch (props.textState) {
            case Ran_State.NEVER_RAN:
            case Ran_State.CLOSED:
                return { lineNumber: props.lineNumbers, displayText: props.readMore, showText: props.showReadMore };
            case Ran_State.OPEN:
            default:
                return { lineNumber: 0, displayText: props.reaLess, showText: props.showReadLess };
        }
    };

    return (
        <Fragment>
            <Text style={{ position: "relative" }} numberOfLines={textState().lineNumber} ellipsizeMode="tail">
                {props.displayText}
            </Text>
            {props.disableReadMore || !textState().showText ? (
                <Fragment></Fragment>
            ) : (
                <View>
                    <Text style={{ fontWeight: "bold", textAlign: props.textAlign }}>{textState().displayText}</Text>
                </View>
            )}
        </Fragment>
    );
};
