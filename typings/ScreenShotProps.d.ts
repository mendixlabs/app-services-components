/**
 * This file was generated from ScreenShot.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface ScreenShotContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    classNameToFound: string;
    prefixPageName: string;
    printButton: ReactNode;
}

export interface ScreenShotPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    classNameToFound: string;
    prefixPageName: string;
    printButton: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
