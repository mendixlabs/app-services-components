import { Component, ReactNode, createElement } from "react";
import { ImagecarouselwidgetPreviewProps } from "../typings/ImagecarouselwidgetProps";

declare function require(name: string): string;

export class preview extends Component<ImagecarouselwidgetPreviewProps> {
    render(): ReactNode {
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Imagecarouselwidget.css");
}
