import { EditableValue, DynamicValue, GUID } from "mendix";
import React from "react";

import type { Style } from "@mendix/pluggable-widgets-tools";
import type { Big } from "big.js";
import type { TextStyle, ViewStyle } from "react-native";

export type AttributeValue = undefined | string | boolean | Date | GUID | GUID[] | Big; // I no want to do this

export interface EditableState {
    isLoading: boolean;
    canEdit: boolean;
}
export interface DynamicState {
    isLoading: boolean;
}
export interface EditableMethods<T> {
    setValue: (value: T) => void;
}

export type ControlledPlayingTypes = {
    parsedAnimation: AnimationObject;
    frameToStart: DynamicValue<Big>;
    frameToEnd: DynamicValue<Big>;
    loopAnimation: DynamicValue<boolean>;
    pausePlay: EditableValue<boolean>;
};

export interface AnimationObject {
    v: string;
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: any[];
    layers: any[];
}
export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export type LottieViewContainerTypes = {
    width: string;
    height: string;
    isBackground: boolean;
    children?: React.ReactElement;
};
