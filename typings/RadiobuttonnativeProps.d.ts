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
    yourName: string;
    enumAttribute?: EditableValue<string>;
    boolAttribute?: EditableValue<boolean>;
    booleanNames: BooleanNamesType[];
}

export interface RadiobuttonnativePreviewProps {
    class: string;
    style: string;
    yourName: string;
    enumAttribute: string;
    boolAttribute: string;
    booleanNames: BooleanNamesPreviewType[];
}
