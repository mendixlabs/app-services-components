import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { EditdropdownPreviewProps } from "../typings/EditdropdownProps";

declare function require(name: string): string;

export class preview extends Component<EditdropdownPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Editdropdown.css");
}
