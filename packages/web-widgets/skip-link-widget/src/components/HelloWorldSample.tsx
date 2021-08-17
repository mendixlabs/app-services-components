import { createElement, useEffect } from "react";

export interface HelloWorldSampleProps {
    sampleText?: string;
}

// export class HelloWorldSample extends Component<HelloWorldSampleProps> {
//     render(): ReactNode {
//         return <div className="widget-hello-world">Hello {this.props.sampleText}</div>;
//     }
// }

export const HelloWorldSample: React.FC<HelloWorldSampleProps> = () => {
    useEffect(() => {
        //   Create Skip Link
        // @ts-ignore
        console.log(`window.mx`, window.mx.isLoaded());
        const newDiv = document.createElement("div");
        var a = document.createElement("button");
        a.textContent = "my title text";
        a.onclick = () => focusIDElement();
        a.setAttribute("class", "skip");
        newDiv.appendChild(a);
        const mainElement = document.getElementsByClassName("navbar-brand");
        console.log(`mainElement`, mainElement);

        /**
         * Prepend or Append
         */

        mainElement[0].prepend(newDiv);
    }, []);
    useEffect(() => {
        const mainElement = document.getElementsByClassName("region-content-header");
        // const t = document.getElementById("mxui_widget_TabContainer_0_tab-0");
        console.log(`mainElement`, mainElement);
        const y = mainElement[0];
        y.id = "MAIN_CONTENT_SKIP_TO";
        y.setAttribute("tabindex", "-1");

        // setTimeout(() => {
        //     const t = document.getElementById("MAIN_CONTENT_SKIP_TO");

        //     if (t) {
        //         t.focus();
        //         t.style.backgroundColor = "red";
        //     }
        // }, 5000);
    }, []);

    const focusIDElement = () => {
        const t = document.getElementById("MAIN_CONTENT_SKIP_TO");

        if (t) {
            t.focus();
            t.style.backgroundColor = "red";
        }
    };
    return (
        <div>
            <div onClick={focusIDElement}>Hello Me</div>
            {/* <a>SkipTo Content</a> */}
        </div>
    );
};

// export  HelloWorldSample
