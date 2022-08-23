/**
 * This file was generated from LottieNative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type PlayModeEnum = "sequential" | "controlled";

export interface SequenceType {
    startFrame: number;
    endFrame: number;
    loop: boolean;
    onDoneAction?: ActionValue;
}

export interface SequencePreviewType {
    startFrame: number | null;
    endFrame: number | null;
    loop: boolean;
    onDoneAction: {} | null;
}

export interface LottieNativeProps<Style> {
    name: string;
    style: Style[];
    animationJson: DynamicValue<string>;
    height: string;
    width: string;
    isBackground: boolean;
    playMode: PlayModeEnum;
    frameToStart: DynamicValue<Big>;
    frameToEnd: DynamicValue<Big>;
    loopAnimation: DynamicValue<boolean>;
    pausePlay: EditableValue<boolean>;
    sequence: SequenceType[];
}

export interface LottieNativePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    animationJson: string;
    height: string;
    width: string;
    isBackground: boolean;
    playMode: PlayModeEnum;
    frameToStart: string;
    frameToEnd: string;
    loopAnimation: string;
    pausePlay: string;
    sequence: SequencePreviewType[];
}
