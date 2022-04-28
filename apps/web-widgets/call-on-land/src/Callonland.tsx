import { createElement, useEffect } from "react";

const Callonland = ({ buttonAction }: any) => {
    const locationCallBack = () => {
        console.log(`🚀🚀🚀🚀`, document.location + ", state: ", window.history.state.pageInfo);
    };
    useEffect(() => {
        window.onbeforeunload = function () {
            return "You will  leave this page";
        };
        console.log(`buttonAction`, buttonAction);
        // window.onpopstate = function (e: any) {
        //     e.preventDefault();
        //     console.log(`🚀🚀🚀🚀`, document.location + ", state: " + JSON.stringify(e.state));
        //     if (e.state.pageInfo === null || e.state.pageInfo === undefined) {
        //         console.warn(`${e.state}`);
        //         buttonAction.execute();
        //     }
        // };
    }, []);
    return <div>hello</div>;
};

export default Callonland;
