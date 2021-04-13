/**
 * This file was generated from Imagecarouselwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ListValue, ListWidgetValue } from "mendix";

export interface ImagecarouselwidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    incomingData: ListValue;
    content: ListWidgetValue;
    maxHeight: number;
    maxWidth: number;
    autoPlay: boolean;
    stopOnHover: boolean;
    infiniteLoop: boolean;
    swipeable: boolean;
    showArrows: boolean;
    dynamicHeight: boolean;
    showIndicators: boolean;
    useKeyboardArrows: boolean;
}

export interface ImagecarouselwidgetPreviewProps {
    class: string;
    style: string;
    incomingData: {} | null;
    content: { widgetCount: number; renderer: ComponentType };
    maxHeight: number | null;
    maxWidth: number | null;
    autoPlay: boolean;
    stopOnHover: boolean;
    infiniteLoop: boolean;
    swipeable: boolean;
    showArrows: boolean;
    dynamicHeight: boolean;
    showIndicators: boolean;
    useKeyboardArrows: boolean;
}
