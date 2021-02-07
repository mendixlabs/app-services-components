import { Component, ReactNode, createElement } from "react";
import { collapsibleheaderPreviewProps } from "../typings/collapsibleheaderProps";

declare function require(name: string): string;

export class preview extends Component<collapsibleheaderPreviewProps> {
    render(): ReactNode {
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/collapsibleheader.css");
}
