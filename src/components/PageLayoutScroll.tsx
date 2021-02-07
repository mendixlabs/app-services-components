import { createElement, ReactElement, useEffect } from "react";
import { useMendixScroll } from "./useScroll";
type PageLayoutScrollTypes = {
    collapseHeaderClassName: string;
    scrollBodyClassName: string;
    headerClassName: string;
    threshold: number;
};
const PageLayoutScroll = ({
    scrollBodyClassName,
    headerClassName,
    threshold,
    collapseHeaderClassName
}: PageLayoutScrollTypes): ReactElement => {
    const [scrollY, scrollDirection] = useMendixScroll(
        scrollBodyClassName,
        headerClassName,
        threshold,
        collapseHeaderClassName
    );

    useEffect(() => {}, [scrollDirection, scrollY]);
    return <div></div>;
};

export default PageLayoutScroll;
