import { Component, ReactNode, createElement } from "react";
import { CollapsibleheaderPreviewProps } from "../typings/CollapsibleheaderProps";

declare function require(name: string): string;

export class preview extends Component<CollapsibleheaderPreviewProps> {
    render(): ReactNode {
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Collapsibleheader.css");
}
