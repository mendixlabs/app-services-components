import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { CallonlandPreviewProps } from "../typings/CallonlandProps";

declare function require(name: string): string;

export class preview extends Component<CallonlandPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Callonland.css");
}
