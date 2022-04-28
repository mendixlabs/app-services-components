import { createElement, Fragment, FunctionComponent } from "react";

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

import { RadioButtonProps, ButtonOptions } from "../types";

const RadioButtons: FunctionComponent<RadioButtonProps> = ({
    labelHorizontal,
    formHorizontal,
    buttonOptions,
    defaultValue,
    onPress,
    buttonSize,
    labelColor,
    labelFontSize,
    buttonOuterSize,
    buttonOuterColor,
    buttonInnerColor
}) => {
    const onButtonPress = (value: boolean | string): void => {
        onPress(value);
    };
    const buttonSizeChecked = buttonSize ? +buttonSize : 12;
    const labelColorChecked = labelColor ? labelColor : "#000";
    const labelFontSizeChecked = labelFontSize ? +labelFontSize : 12;
    const buttonInnerColorChecked = buttonInnerColor ? buttonInnerColor : "#000";
    const buttonOuterColorChecked = buttonOuterColor ? buttonOuterColor : "#000";
    const buttonOuterSizeChecked = buttonOuterSize ? +buttonOuterSize : (buttonSizeChecked as number) + 8;
    return (
        <Fragment>
            <RadioForm formHorizontal={formHorizontal}>
                {buttonOptions.map((obj: ButtonOptions, i: number) => (
                    <RadioButton labelHorizontal={labelHorizontal} key={i}>
                        <RadioButtonInput
                            obj={obj}
                            index={i}
                            buttonStyle={{}}
                            buttonSize={buttonSizeChecked}
                            buttonWrapStyle={{ marginLeft: 10 }}
                            isSelected={defaultValue === obj.value}
                            onPress={value => onButtonPress(value)}
                            buttonOuterSize={buttonOuterSizeChecked}
                            buttonInnerColor={buttonInnerColorChecked}
                            buttonOuterColor={buttonOuterColorChecked}
                        />
                        <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelWrapStyle={{}}
                            labelHorizontal={labelHorizontal}
                            onPress={value => onButtonPress(value)}
                            labelStyle={{ fontSize: labelFontSizeChecked, color: labelColorChecked }}
                        />
                    </RadioButton>
                ))}
            </RadioForm>
        </Fragment>
    );
};

export default RadioButtons;
