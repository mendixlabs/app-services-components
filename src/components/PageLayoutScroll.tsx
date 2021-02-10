import { createElement, ReactElement } from "react";
import { useMendixScroll } from "./useScroll";
import { PageLayoutScrollTypes } from "../types";

const PageLayoutScroll = ({
    threshold,
    animationSpeed,
    headerClassName,
    reactOnClassName,
    smartCompensator,
    scrollBodyClassName,
    reactOnClassNameToAdd,
    expandOnLessThreshold,
    collapseHeaderClassName
}: PageLayoutScrollTypes): ReactElement => {
    useMendixScroll({
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

    return <div></div>;
};

export default PageLayoutScroll;
