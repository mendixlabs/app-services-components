import { Component, ReactNode, createElement, Fragment } from "react";
import { TextStyle, ViewStyle, Text } from "react-native";
import RadioButtons from "./components/RadioButtons";

import { Style } from "@mendix/pluggable-widgets-tools";

import { RadiobuttonnativeProps } from "../typings/RadiobuttonnativeProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class Radiobuttonnative extends Component<RadiobuttonnativeProps<CustomStyle>> {
    render(): ReactNode {
        const { boolAttribute, booleanNames } = this.props;
        console.log(this.props);
        return (
            <Fragment>
                <RadioButtons boolAttribute={boolAttribute} booleanNames={booleanNames} />
                <Text>Enums</Text>
                {this.props.enumAttribute &&
                    this.props.enumAttribute.universe?.map(x => (
                        <Text onPress={() => this.props.enumAttribute && this.props.enumAttribute.setValue(x)}>
                            {x}
                        </Text>
                    ))}
                {/* <Text>Bools</Text>
                {this.props.boolAttribute &&
                    this.props.boolAttribute.universe?.map(x => (
                        <Text onPress={() => this.props.boolAttribute && this.props.boolAttribute.setValue(x)}>
                            {x} - Value
                        </Text>
                    ))} */}
            </Fragment>
        );
    }
}
