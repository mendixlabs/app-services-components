import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { EditdropdownContainerProps } from "../typings/EditdropdownProps";

import "./ui/Editdropdown.css";

export default class Editdropdown extends Component<EditdropdownContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
