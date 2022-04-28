import { Component, ReactNode, createElement } from "react";
import { CountdowntimerwidgetPreviewProps } from "../typings/CountdowntimerwidgetProps";

declare function require(name: string): string;

export class preview extends Component<CountdowntimerwidgetPreviewProps> {
    render(): ReactNode {
        return <div></div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Countdowntimerwidget.css");
}
