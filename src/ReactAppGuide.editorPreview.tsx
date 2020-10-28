import { Component, ReactNode, createElement } from "react";
import { ReactAppGuidePreviewProps } from "../typings/ReactAppGuideProps";

declare function require(name: string): string;

export class preview extends Component<ReactAppGuidePreviewProps> {
    render(): ReactNode {
        return <div></div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/ReactAppGuide.css");
}
