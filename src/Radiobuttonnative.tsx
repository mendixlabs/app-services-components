import { Component, ReactNode, createElement, Fragment } from "react";
import { TextStyle, ViewStyle, Text } from "react-native";
import RadioButtons from "./components/RadioButtons";

import { Style } from "@mendix/pluggable-widgets-tools";

import { RadiobuttonnativeProps } from "../typings/RadiobuttonnativeProps";
import { RadioButtonOptionsEnum, ButtonOptions, RadioButtonMainState, EnumFormatterType } from "./types";
export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class Radiobuttonnative extends Component<RadiobuttonnativeProps<CustomStyle>, RadioButtonMainState> {
    constructor(props: RadiobuttonnativeProps<CustomStyle>) {
        super(props);
        this.state = { isBooleanRadioButton: RadioButtonOptionsEnum.Loading };
    }
    rationalizeBooleanOptions = (): void => {
        const { boolAttribute, booleanNames } = this.props;
        if (boolAttribute && boolAttribute.universe) {
            const reducedOptions = boolAttribute.universe?.reduce((a: ButtonOptions[], c: any): ButtonOptions[] => {
                const foundBooleanName = booleanNames.find((e: any) => e.booleanValue === c);
                return [...a, { label: foundBooleanName ? foundBooleanName.booleanName : c, value: c }];
            }, []);
            this.setState({
                buttonOptions: reducedOptions,
                defaultValue: boolAttribute.value,
                isBooleanRadioButton: RadioButtonOptionsEnum.Bool
            });
        }
    };
    rationalizeEnumOptions = (): void => {
        const { enumAttribute } = this.props;
        if (enumAttribute && enumAttribute.universe) {
            const enumFormatter = enumAttribute.formatter;
            const reducedOptions = enumAttribute.universe?.reduce((a: ButtonOptions[], c: string): ButtonOptions[] => {
                const foundName = (enumFormatter as any)?.universe.find((x: EnumFormatterType): boolean => {
                    return x.key === c;
                });
                return [...a, { label: foundName ? foundName.caption : c, value: c }];
            }, []);
            this.setState({
                buttonOptions: reducedOptions,
                defaultValue: enumAttribute.value,
                isBooleanRadioButton: RadioButtonOptionsEnum.Enum
            });
        }
    };

    componentDidUpdate(): void {
        const { boolAttribute, enumAttribute } = this.props;
        const { isBooleanRadioButton } = this.state;
        // Initializer
        if (isBooleanRadioButton === RadioButtonOptionsEnum.Loading) {
            if (boolAttribute && boolAttribute.status === "available") {
                this.rationalizeBooleanOptions();
            }
            if (enumAttribute && enumAttribute.status === "available") {
                this.rationalizeEnumOptions();
            }
        }
        // Adds 2 way data binding
        // console.log("pP", pP);
    }
    onPressBoolean = (value: boolean): void => {
        const { boolAttribute } = this.props;
        if (boolAttribute) {
            boolAttribute.setValue(value);
            this.setState({
                defaultValue: value
            });
        }
    };
    onPressEnum = (value: string): void => {
        const { enumAttribute } = this.props;
        if (enumAttribute) {
            enumAttribute.setValue(value as string);
            this.setState({
                defaultValue: value
            });
        }
    };

    render(): ReactNode {
        const {
            buttonSize,
            labelColor,
            labelFontSize,
            formHorizontal,
            labelHorizontal,
            buttonOuterSize,
            buttonOuterColor,
            buttonInnerColor
        } = this.props;
        const { isBooleanRadioButton, buttonOptions, defaultValue } = this.state;
        console.log("this.state", this.state);
        switch (isBooleanRadioButton) {
            case RadioButtonOptionsEnum.Loading:
                return (
                    <Fragment>
                        <Text>Loading</Text>
                    </Fragment>
                );

            case RadioButtonOptionsEnum.Bool:
                return (
                    <Fragment>
                        <RadioButtons
                            labelColor={labelColor}
                            buttonSize={buttonSize}
                            defaultValue={defaultValue}
                            labelFontSize={labelFontSize}
                            buttonOptions={buttonOptions}
                            onPress={this.onPressBoolean}
                            formHorizontal={formHorizontal}
                            labelHorizontal={labelHorizontal}
                            buttonOuterSize={buttonOuterSize}
                            buttonOuterColor={buttonOuterColor}
                            buttonInnerColor={buttonInnerColor}
                        />
                    </Fragment>
                );
            case RadioButtonOptionsEnum.Enum:
                return (
                    <Fragment>
                        <RadioButtons
                            labelColor={labelColor}
                            buttonSize={buttonSize}
                            onPress={this.onPressEnum}
                            defaultValue={defaultValue}
                            labelFontSize={labelFontSize}
                            buttonOptions={buttonOptions}
                            formHorizontal={formHorizontal}
                            labelHorizontal={labelHorizontal}
                            buttonOuterSize={buttonOuterSize}
                            buttonOuterColor={buttonOuterColor}
                            buttonInnerColor={buttonInnerColor}
                        />
                    </Fragment>
                );

            default:
                break;
        }
    }
}
