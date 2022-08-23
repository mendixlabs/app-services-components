/**
 * This file was generated from ReactAppGuide.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, DynamicValue } from "mendix";

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

export interface ReactAppGuideContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
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

export interface ReactAppGuidePreviewProps {
    class: string;
    style: string;
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
