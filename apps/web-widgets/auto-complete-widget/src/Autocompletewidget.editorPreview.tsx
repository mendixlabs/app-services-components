import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AutocompletewidgetPreviewProps } from "../typings/AutocompletewidgetProps";

declare function require(name: string): string;

export class preview extends Component<AutocompletewidgetPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Autocompletewidget.css");
}
