/**
 * This file was generated from Autocompletewidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface AutocompletewidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    sampleText: string;
    dataSourceOptions: ListValue;
    titleAttr: ListAttributeValue<string>;
    volatileDate?: EditableValue<string>;
    onClick?: ActionValue;
}

export interface AutocompletewidgetPreviewProps {
    class: string;
    style: string;
    sampleText: string;
    dataSourceOptions: {} | null;
    titleAttr: string;
    volatileDate: string;
    onClick: {} | null;
}
