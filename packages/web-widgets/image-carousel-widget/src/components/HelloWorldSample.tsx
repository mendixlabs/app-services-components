import { Component, ReactNode, createElement } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
export interface HelloWorldSampleProps {
    sampleText?: string;
}

export class HelloWorldSample extends Component<HelloWorldSampleProps> {
    render(): ReactNode {
        return (
            <div className="widget-hello-world">
                Hello {this.props.sampleText}
                <Carousel>
                    <div>
                        <img src="https://images.unsplash.com/photo-1612831819784-9084c50c5477?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=4050&q=80" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1612831819784-9084c50c5477?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=4050&q=80" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1612831819784-9084c50c5477?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=4050&q=80" />
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>
        );
    }
}
