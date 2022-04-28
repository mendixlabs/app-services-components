import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { DarktogglePreviewProps } from "../typings/DarktoggleProps";

declare function require(name: string): string;

export class preview extends Component<DarktogglePreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.classNameToToggle} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Darktoggle.css");
}
