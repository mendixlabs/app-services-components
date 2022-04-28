import { Component, ReactNode, createElement, Fragment } from "react";
import { TextStyle, ViewStyle, Text } from "react-native";
import RadioButtons from "./components/RadioButtons";
import { Style } from "@mendix/pluggable-widgets-tools";

import { RadiobuttonnativeProps } from "../typings/RadiobuttonnativeProps";
import { RadioButtonOptionsEnum, ButtonOptions, RadioButtonMainState } from "./types";

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
            const reducedOptions = enumAttribute.universe?.reduce((a: ButtonOptions[], c: string): ButtonOptions[] => {
                const formattedName = this.props?.enumAttribute?.formatter.format(c);
                return [...a, { label: formattedName ? formattedName : c, value: c }];
            }, []);
            this.setState({
                buttonOptions: reducedOptions,
                defaultValue: enumAttribute.value,
                isBooleanRadioButton: RadioButtonOptionsEnum.Enum
            });
        }
    };
    componentDidMount() {
        this.initializeTheButtons();
    }
    componentDidUpdate(): void {
        const { boolAttribute, enumAttribute } = this.props;
        const { isBooleanRadioButton } = this.state;
        // Initializer
        this.initializeTheButtons();

        if (isBooleanRadioButton === RadioButtonOptionsEnum.Loading) {
            if (boolAttribute && boolAttribute.status === "available") {
                this.rationalizeBooleanOptions();
            }
            if (enumAttribute && enumAttribute.status === "available") {
                this.rationalizeEnumOptions();
            }
        }
        // Adds 2 way data binding
        if (isBooleanRadioButton === RadioButtonOptionsEnum.Enum) {
            if (enumAttribute && enumAttribute.status === "available") {
                if (this.state.defaultValue !== enumAttribute.value) {
                    this.onPressEnum(enumAttribute.value as string);
                }
            }
        }
        if (isBooleanRadioButton === RadioButtonOptionsEnum.Bool) {
            if (boolAttribute && boolAttribute.status === "available") {
                if (this.state.defaultValue !== boolAttribute.value) {
                    this.onPressBoolean(boolAttribute.value as boolean);
                }
            }
        }
    }

    initializeTheButtons = () => {
        const { boolAttribute, enumAttribute } = this.props;
        const { isBooleanRadioButton } = this.state;
        if (isBooleanRadioButton === RadioButtonOptionsEnum.Loading) {
            if (boolAttribute && boolAttribute.status === "available") {
                this.rationalizeBooleanOptions();
            }
            if (enumAttribute && enumAttribute.status === "available") {
                this.rationalizeEnumOptions();
            }
        }
    };
    onPressBoolean = (value: boolean): void => {
        const { boolAttribute, onClickAction } = this.props;
        if (onClickAction) {
            onClickAction.execute();
        }
        if (boolAttribute) {
            boolAttribute.setValue(value);
            this.setState({
                defaultValue: value
            });
        }
    };
    onPressEnum = (value: string): void => {
        const { enumAttribute, onClickAction } = this.props;
        if (onClickAction?.canExecute) {
            onClickAction.execute();
        }
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
        switch (isBooleanRadioButton) {
            case RadioButtonOptionsEnum.Loading:
                return (
                    <Fragment>
                        <Text>Loading Radio Buttons...</Text>
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
