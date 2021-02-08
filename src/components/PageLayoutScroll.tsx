import { createElement, ReactElement, useEffect } from "react";
import { useMendixScroll } from "./useScroll";
type PageLayoutScrollTypes = {
    collapseHeaderClassName: string;
    scrollBodyClassName: string;
    headerClassName: string;
    smartCompensator: boolean;
    expandOnLessThreshold: boolean;
    threshold: number;
    animationSpeed: number | undefined;
};
const PageLayoutScroll = ({
    collapseHeaderClassName,
    animationSpeed,
    scrollBodyClassName,
    smartCompensator,
    headerClassName,
    expandOnLessThreshold,
    threshold
}: PageLayoutScrollTypes): ReactElement => {
    const [scrollY, scrollDirection] = useMendixScroll(
        scrollBodyClassName,
        headerClassName,
        threshold,
        collapseHeaderClassName,
        smartCompensator,
        animationSpeed,
        expandOnLessThreshold
    );

    useEffect(() => {}, [scrollDirection, scrollY]);
    return <div></div>;
};

export default PageLayoutScroll;
