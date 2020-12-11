import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { DraganddropwidgetPreviewProps } from "../typings/DraganddropwidgetProps";

declare function require(name: string): string;

export class preview extends Component<DraganddropwidgetPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={"Hello"} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Draganddropwidget.css");
}
