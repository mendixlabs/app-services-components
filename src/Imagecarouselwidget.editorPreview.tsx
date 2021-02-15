import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { ImagecarouselwidgetPreviewProps } from "../typings/ImagecarouselwidgetProps";

declare function require(name: string): string;

export class preview extends Component<ImagecarouselwidgetPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Imagecarouselwidget.css");
}
