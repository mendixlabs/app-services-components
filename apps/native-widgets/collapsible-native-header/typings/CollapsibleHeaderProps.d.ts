/**
 * This file was generated from CollapsibleHeader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";

export interface CollapsibleHeaderProps<Style> {
    name: string;
    style: Style[];
    headerActionArea?: ReactNode;
    contentArea: ReactNode;
    headerTextColor: string;
    headerBackgroundColor: string;
    headerFontSize: number;
    collapsedFontSize: number;
    backButtonSize: number;
    uiMinHeight: number;
    uiMaxHeight: number;
    uiPaddingSides: number;
    bottomFooterHeight: number;
}

export interface CollapsibleHeaderPreviewProps {
    class: string;
    style: string;
    headerActionArea: { widgetCount: number; renderer: ComponentType };
    contentArea: { widgetCount: number; renderer: ComponentType };
    headerTextColor: string;
    headerBackgroundColor: string;
    headerFontSize: number | null;
    collapsedFontSize: number | null;
    backButtonSize: number | null;
    uiMinHeight: number | null;
    uiMaxHeight: number | null;
    uiPaddingSides: number | null;
    bottomFooterHeight: number | null;
}
