import { createElement, useEffect } from "react";
import { useScroll } from "./useNewScroll";
import { differenceInMilliseconds } from "date-fns";
import { useDomLocation } from "usedomlocation";

import { PageLayoutScrollTypes } from "../types";
export const PageLayoutScroll = ({
    threshold,
    animationSpeed,
    headerClassName,
    reactOnClassName,
    smartCompensator,
    scrollBodyClassName,
    reactOnClassNameToAdd,
    expandOnLessThreshold,
    collapseHeaderClassName
}: PageLayoutScrollTypes) => {
    const { setInitializer } = useScroll({
        threshold,
        animationSpeed,
        headerClassName,
        smartCompensator,
        reactOnClassName,
        scrollBodyClassName,
        expandOnLessThreshold,
        reactOnClassNameToAdd,
        collapseHeaderClassName
    });
    const locationCallBack = () => {
        setInitializer(false);
    };
    const { lastUpdateTime } = useDomLocation({ locationCallBack, throttleDuration: 500, useMendixNav: true });

    useEffect(() => {
        const interval = setInterval(() => {
            if (differenceInMilliseconds(new Date(), lastUpdateTime) > 100) {
                setInitializer(true);
                return clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastUpdateTime]);
    return <div></div>;
};
