import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AutocompletewidgetContainerProps } from "../typings/AutocompletewidgetProps";

import "./ui/Autocompletewidget.css";

export default class Autocompletewidget extends Component<AutocompletewidgetContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
