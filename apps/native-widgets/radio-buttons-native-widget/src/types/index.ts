export enum RadioButtonOptionsEnum {
    Loading,
    Enum,
    Bool
}
export type ButtonOptions = {
    label: string;
    value: number | string | boolean;
};
export type EnumFormatterType = {
    key: string;
    caption: string;
};
export type RadioButtonMainState = {
    buttonOptions?: ButtonOptions[];
    defaultValue?: number | string | boolean;
    isBooleanRadioButton: RadioButtonOptionsEnum;
};

export type RadioButtonProps = {
    defaultValue?: any;
    buttonOptions?: any;
    buttonSize?: string;
    labelColor?: string;
    labelFontSize?: string;
    formHorizontal: boolean;
    labelHorizontal: boolean;
    buttonOuterSize?: string;
    buttonOuterColor?: string;
    buttonInnerColor?: string;
    onPress: (value: boolean | string) => void;
};
