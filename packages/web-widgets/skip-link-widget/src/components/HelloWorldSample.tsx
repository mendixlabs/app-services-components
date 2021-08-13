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
        const mainElement = document.getElementsByClassName("region-content-main");
        const t = document.getElementById("mxui_widget_TabContainer_0_tab-0");
        if (t) {
            t.focus();
        }
        mainElement[0].id = "MAIN_CONTENT_SKIP_TO";

        setTimeout(() => {
            const t = document.getElementById("MAIN_CONTENT_SKIP_TO");
            if (t) {
                location.hash = "?id=MAIN_CONTENT_SKIP_TO";
                t.style.backgroundColor = "green";
            }
        }, 5000);
    }, []);

    // const focusIDElement = () => {
    //     location.hash = "#" + "MAIN_CONTENT_SKIP_TO";
    //     if (t) {
    //         setTimeout(() => {
    //             console.log(`mainElement`, t);
    //             location.hash = "#" + "MAIN_CONTENT_SKIP_TO";
    //             // t.focus();
    //             // t.scrollIntoView(true);
    //             // t.onfocus
    //         }, 3000);
    //     }
    // };
    return (
        <div>
            <a href={"#MAIN_CONTENT_SKIP_TO"}>Hello Me</a>
            hello
            {/* <a>SkipTo Content</a> */}
        </div>
    );
};

// export  HelloWorldSample
