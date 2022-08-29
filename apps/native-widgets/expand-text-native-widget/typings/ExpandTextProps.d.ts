/**
 * This file was generated from ExpandText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export type TextAlignEnum = "left" | "right";

export interface ExpandTextProps<Style> {
    name: string;
    style: Style[];
    toAnimate: boolean;
    numberOfLines: DynamicValue<Big>;
    longText: DynamicValue<string>;
    readMore: string;
    showReadMore: boolean;
    readLess: string;
    showReadLess: boolean;
    textAlign: TextAlignEnum;
}

export interface ExpandTextPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    toAnimate: boolean;
    numberOfLines: string;
    longText: string;
    readMore: string;
    showReadMore: boolean;
    readLess: string;
    showReadLess: boolean;
    textAlign: TextAlignEnum;
}
