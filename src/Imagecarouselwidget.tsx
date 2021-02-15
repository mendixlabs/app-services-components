import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { ImagecarouselwidgetContainerProps } from "../typings/ImagecarouselwidgetProps";

import "./ui/Imagecarouselwidget.css";

export default class Imagecarouselwidget extends Component<ImagecarouselwidgetContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
