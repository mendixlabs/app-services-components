/**
 * This file was generated from ScreenShot.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type PageSizeEnum = "letter" | "a4" | "a5" | "a6";

export type PageOrientationEnum = "l" | "p";

export interface ScreenShotContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    pageSize: PageSizeEnum;
    pageOrientation: PageOrientationEnum;
    classNameToFound: string;
    prefixPageName: string;
    printButton: ReactNode;
}

export interface ScreenShotPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    pageSize: PageSizeEnum;
    pageOrientation: PageOrientationEnum;
    classNameToFound: string;
    prefixPageName: string;
    printButton: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
