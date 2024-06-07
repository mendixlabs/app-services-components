import { CSSProperties } from "react";
import { Option } from "mendix";

export interface AlertProps {
    id: string;
    message?: string;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";
}

export interface RadioLabelProps {
    id: string;
    labelCaption?: string | undefined;
    customClass?: string | undefined;
}

export type SingleRadioValueProps = {
    isChecked: boolean;
    value: boolean;
    label: string;
}

export type FormHorizotalLayout = {
    useColumns: true;
    bootsrapBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    labelWidth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}

type FormVerticalLayout = {
    useColumns: false;
}

type FormLayout = FormHorizotalLayout | FormVerticalLayout;

export type ControlLabelProps = FormLayout & {
    withControlLabel: true;
    caption: string;
}

export type NoControlLabelProps = {
    withControlLabel: false;
}

type GeneralRadioButtonsProps = (ControlLabelProps | NoControlLabelProps) & {
    // General
    id: string; // General identifier for the radio button group

    // Error handling
    validationMessage: Option<string>;

    // Form-group
    className: string; // Custom CSS class for the form-group
    style?: CSSProperties; // Custom inline style for the form-group
}

export type StaticRadioButtonsProps = GeneralRadioButtonsProps & {
    isStatic: true;
    valueText: string;
}

export type NonStaticRadioButtonsProps = GeneralRadioButtonsProps & {
    isStatic: false;

    // Accessibility
    tabIndex: number;
    ariaRequired: boolean;

    readOnly: boolean;
    setValue: (value: Option<boolean | string>) => void;
    values: SingleRadioValueProps[] 
}

export type RadioButtonsProps = StaticRadioButtonsProps | NonStaticRadioButtonsProps;