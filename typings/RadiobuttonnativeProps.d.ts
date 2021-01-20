/**
 * This file was generated from Radiobuttonnative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { EditableValue } from "mendix";

export interface BooleanNamesType {
    booleanValue: boolean;
    booleanName: string;
}

export interface BooleanNamesPreviewType {
    booleanValue: boolean;
    booleanName: string;
}

export interface RadiobuttonnativeProps<Style> {
    name: string;
    style: Style[];
    enumAttribute?: EditableValue<string>;
    boolAttribute?: EditableValue<boolean>;
    booleanNames: BooleanNamesType[];
    formHorizontal: boolean;
    labelHorizontal: boolean;
    buttonInnerColor: string;
    buttonOuterColor: string;
    buttonSize: string;
    buttonOuterSize: string;
    labelFontSize: string;
    labelColor: string;
}

export interface RadiobuttonnativePreviewProps {
    class: string;
    style: string;
    enumAttribute: string;
    boolAttribute: string;
    booleanNames: BooleanNamesPreviewType[];
    formHorizontal: boolean;
    labelHorizontal: boolean;
    buttonInnerColor: string;
    buttonOuterColor: string;
    buttonSize: string;
    buttonOuterSize: string;
    labelFontSize: string;
    labelColor: string;
}
