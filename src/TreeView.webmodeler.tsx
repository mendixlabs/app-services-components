import { Component, ReactNode, createElement } from "react";
import { TreeViewPreviewProps } from "../typings/TreeViewProps";

declare function require(name: string): string;

export class preview extends Component<TreeViewPreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/TreeView.scss");
}
