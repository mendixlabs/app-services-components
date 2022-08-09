/**
 * This file was generated from LottieNative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export interface LottieNativeProps<Style> {
    name: string;
    style: Style[];
    animationJson: string;
    sectionsToPlay: DynamicValue<string>;
    height: string;
    width: string;
    isBackground: boolean;
    loopAnimation: boolean;
    autoPlayAnimation: boolean;
}

export interface LottieNativePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    animationJson: string;
    sectionsToPlay: string;
    height: string;
    width: string;
    isBackground: boolean;
    loopAnimation: boolean;
    autoPlayAnimation: boolean;
}
