import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AutocompletewidgetContainerProps } from "../typings/AutocompletewidgetProps";

import "./ui/Autocompletewidget.css";

export default class Autocompletewidget extends Component<AutocompletewidgetContainerProps> {
    click = (object: any) => {
        console.log(`object`, object);

        this.props.volatileDate?.setValue(JSON.stringify(object));
    };
    render(): ReactNode {
        console.log(`this.props`, this.props);

        if (this.props.dataSourceOptions.status === "available") {
            console.log(
                this.props.dataSourceOptions.items?.map(item => {
                    console.log(`item`, this.props.titleAttr(item));
                })
            );
            return (
                <div>
                    {this.props.dataSourceOptions.items?.map(item => {
                        return (
                            <div>
                                <span onClick={() => this.click(this.props.titleAttr(item).value)}>
                                    {this.props.titleAttr(item).value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
        }
    }
}

// call change on each select

// On Close of drop down
