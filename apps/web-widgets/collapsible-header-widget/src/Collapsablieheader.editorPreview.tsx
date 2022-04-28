import { Component, ReactNode, createElement } from "react";
import { CollapsiblewebheaderContainerProps } from "../typings/CollapsiblewebheaderProps";

declare function require(name: string): string;

export class preview extends Component<CollapsiblewebheaderContainerProps> {
    render(): ReactNode {
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Collapsibleheader.css");
}
