import { Component, ReactNode, createElement } from "react";
import { SkiplinkwidgetPreviewProps } from "../typings/SkiplinkwidgetProps";

declare function require(name: string): string;

export class preview extends Component<SkiplinkwidgetPreviewProps> {
    render(): ReactNode {
        return <div />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Skiplinkwidget.css");
}
