import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { SkiplinkwidgetPreviewProps } from "../typings/SkiplinkwidgetProps";

declare function require(name: string): string;

export class preview extends Component<SkiplinkwidgetPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Skiplinkwidget.css");
}
