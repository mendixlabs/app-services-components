import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { CountdowntimerwidgetContainerProps } from "../typings/CountdowntimerwidgetProps";

import "./ui/Countdowntimerwidget.css";

export default class Countdowntimerwidget extends Component<CountdowntimerwidgetContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
