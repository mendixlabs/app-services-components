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
    boolAttribute?: EditableValue<boolean>;
    booleanNames: BooleanNamesType[];
    enumAttribute?: EditableValue<string>;
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
    boolAttribute: string;
    booleanNames: BooleanNamesPreviewType[];
    enumAttribute: string;
    formHorizontal: boolean;
    labelHorizontal: boolean;
    buttonInnerColor: string;
    buttonOuterColor: string;
    buttonSize: string;
    buttonOuterSize: string;
    labelFontSize: string;
    labelColor: string;
}
