import { createElement, useEffect } from "react";
import { useDomLocation } from "@app-services-components/usedomlocation";

const Callonland = ({ buttonAction }: any) => {
    const locationCallBack = () => {
        console.log(`🚀🚀🚀🚀`, document.location + ", state: ", window.history.state.pageInfo);
    };
    const { lastUpdateTime } = useDomLocation({ locationCallBack, throttleDuration: 500, useMendixNav: true });
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
    console.log(`object`, lastUpdateTime);
    return <div>hello</div>;
};

export default Callonland;
