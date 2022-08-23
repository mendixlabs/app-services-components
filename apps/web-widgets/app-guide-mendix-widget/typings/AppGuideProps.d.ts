/**
 * This file was generated from AppGuide.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type PlacementEnum = "auto" | "top" | "bottom" | "left" | "right";

export interface ListOfStepsType {
    target: DynamicValue<string>;
    title: DynamicValue<string>;
    content: DynamicValue<string>;
    placement: PlacementEnum;
}

export interface ListOfStepsPreviewType {
    target: string;
    title: string;
    content: string;
    placement: PlacementEnum;
}

export interface AppGuideContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    userWelcome: EditableValue<boolean>;
    onUserWelcomeChange?: ActionValue;
    isPageCall: boolean;
    showSkipButton: boolean;
    showProgress: boolean;
    listOfSteps: ListOfStepsType[];
    arrowColor: string;
    textColor: string;
    primaryColor: string;
    backgroundColor: string;
    overlayColor: string;
}

export interface AppGuidePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    userWelcome: string;
    onUserWelcomeChange: {} | null;
    isPageCall: boolean;
    showSkipButton: boolean;
    showProgress: boolean;
    listOfSteps: ListOfStepsPreviewType[];
    arrowColor: string;
    textColor: string;
    primaryColor: string;
    backgroundColor: string;
    overlayColor: string;
}
