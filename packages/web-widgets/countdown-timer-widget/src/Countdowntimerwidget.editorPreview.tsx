import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { CountdowntimerwidgetPreviewProps } from "../typings/CountdowntimerwidgetProps";

declare function require(name: string): string;

export class preview extends Component<CountdowntimerwidgetPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Countdowntimerwidget.css");
}
