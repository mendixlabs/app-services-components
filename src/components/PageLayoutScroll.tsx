import { createElement, ReactElement, useEffect } from "react";
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
    const [scrollY, scrollDirection] = useMendixScroll({
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

    useEffect(() => {}, [scrollDirection, scrollY]);
    return <div></div>;
};

export default PageLayoutScroll;
