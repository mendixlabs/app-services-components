/**
 * This file was generated from CollapsibleHeader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";

export interface CollapsibleHeaderProps<Style> {
    name: string;
    style: Style[];
    headerArea: ReactNode;
    headerActionArea?: ReactNode;
    contentArea: ReactNode;
    uiMinHeight: number;
    uiMaxHeight: number;
    uiPaddingSides: number;
}

export interface CollapsibleHeaderPreviewProps {
    class: string;
    style: string;
    headerArea: { widgetCount: number; renderer: ComponentType };
    headerActionArea: { widgetCount: number; renderer: ComponentType };
    contentArea: { widgetCount: number; renderer: ComponentType };
    uiMinHeight: number | null;
    uiMaxHeight: number | null;
    uiPaddingSides: number | null;
}
