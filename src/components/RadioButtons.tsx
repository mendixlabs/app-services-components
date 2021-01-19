import { createElement, Fragment, FunctionComponent, useState, useEffect } from "react";
import { Text } from "react-native";

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

type CardProps = {
    boolAttribute?: any;
    booleanNames?: any;
};
type RadioButtonProps = {
    label: string;
    value: number | string;
};

const RadioButtons: FunctionComponent<CardProps> = ({ boolAttribute, booleanNames }) => {
    useEffect(() => {
        if (boolAttribute.status === "available") {
            setRadioActiveState(boolAttribute.value);

            const q = boolAttribute.universe.reduce((a: any, c: any) => {
                const foundBooleanName = booleanNames.find((e: any) => e.booleanValue === c);
                return [...a, { label: foundBooleanName ? foundBooleanName.booleanName : c, value: c }];
            }, []);
            setBooleanButtonValues(q);
        }
    }, [boolAttribute]);

    const [booleanButtonValues, setBooleanButtonValues] = useState<RadioButtonProps[]>([]);
    const [stateS, setRadioActiveState] = useState<any>(0);

    const onButtonPress = (value: any) => {
        setRadioActiveState(value); // This will set Local State to What User Selecte - But If Something goes wrong the UseEffect Should revert and correlate with what is in the DB
        boolAttribute.setValue(value);
    };
    return (
        <Fragment>
            <Text>Boolean</Text>
            <RadioForm formHorizontal={true} animation={true}>
                {/* To create radio buttons, loop through your array of options */}
                {booleanButtonValues.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                        <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={stateS === obj.value}
                            onPress={value => onButtonPress(value)}
                            //   borderWidth={1}
                            buttonInnerColor={"#e74c3c"}
                            //   buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                            buttonSize={12}
                            buttonOuterSize={16}
                            buttonStyle={{}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={value => onButtonPress(value)}
                            labelStyle={{ fontSize: 12, color: "#2ecc71" }}
                            labelWrapStyle={{}}
                        />
                    </RadioButton>
                ))}
            </RadioForm>
        </Fragment>
    );
};

export default RadioButtons;
