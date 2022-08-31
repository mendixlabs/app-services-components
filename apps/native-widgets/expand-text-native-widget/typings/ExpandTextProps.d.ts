/**
 * This file was generated from ExpandText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export interface ExpandTextProps<Style> {
    name: string;
    style: Style[];
    toAnimate: boolean;
    numberOfLines: DynamicValue<Big>;
    longText: DynamicValue<string>;
    readMore?: ReactNode;
    showReadMore: boolean;
    showReadLess: boolean;
    readLess?: ReactNode;
}

export interface ExpandTextPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    toAnimate: boolean;
    numberOfLines: string;
    longText: string;
    readMore: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    showReadMore: boolean;
    showReadLess: boolean;
    readLess: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
