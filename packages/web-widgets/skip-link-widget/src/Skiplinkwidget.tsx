import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { SkiplinkwidgetContainerProps } from "../typings/SkiplinkwidgetProps";

import "./ui/Skiplinkwidget.css";

export default class Skiplinkwidget extends Component<SkiplinkwidgetContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
