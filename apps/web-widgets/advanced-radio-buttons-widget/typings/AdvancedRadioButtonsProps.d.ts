/**
 * This file was generated from AdvancedRadioButtons.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue } from "mendix";

export type FormOrientationEnum = "horizontal" | "vertical";

export type OrientationEnum = "horizontal" | "vertical";

export type ReadOnlyStyleEnum = "control" | "text";

export interface CustomLabelsType {
    attributeValueKey: string;
    attributeValueNewCaption: string;
}

export interface CustomLabelsPreviewType {
    attributeValueKey: string;
    attributeValueNewCaption: string;
}

export interface AdvancedRadioButtonsContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    formOrientation: FormOrientationEnum;
    labelWidth: number;
    orientation: OrientationEnum;
    attributeValue: EditableValue<boolean | string>;
    readOnlyStyle: ReadOnlyStyleEnum;
    ariaRequired: boolean;
    showLabel: boolean;
    labelCaption?: DynamicValue<string>;
    useCustomLabels: boolean;
    customLabels: CustomLabelsType[];
    removeOtherOptions: boolean;
}

export interface AdvancedRadioButtonsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    formOrientation: FormOrientationEnum;
    labelWidth: number | null;
    orientation: OrientationEnum;
    attributeValue: string;
    readOnlyStyle: ReadOnlyStyleEnum;
    ariaRequired: boolean;
    showLabel: boolean;
    labelCaption: string;
    useCustomLabels: boolean;
    customLabels: CustomLabelsPreviewType[];
    removeOtherOptions: boolean;
    onChangeAction: {} | null;
}
