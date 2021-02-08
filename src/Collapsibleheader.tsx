import { Component, ReactNode, createElement } from "react";
import PageLayoutScroll from "./components/PageLayoutScroll";

import { collapsibleheaderContainerProps } from "../typings/collapsibleheaderProps";

import "./ui/Collapsibleheader.css";

export default class collapsibleheader extends Component<collapsibleheaderContainerProps> {
    render(): ReactNode {
        const {
            pageLayout,
            scrollBodyClassName,
            headerClassName,
            threshold,
            animationSpeed,
            collapseHeaderClassName,
            expandOnLessThreshold,
            smartCompensator
        } = this.props;

        if (pageLayout) {
            return (
                <PageLayoutScroll
                    collapseHeaderClassName={collapseHeaderClassName}
                    expandOnLessThreshold={expandOnLessThreshold}
                    scrollBodyClassName={scrollBodyClassName}
                    smartCompensator={smartCompensator}
                    headerClassName={headerClassName}
                    animationSpeed={animationSpeed}
                    threshold={threshold}
                />
            );
        }
        if (!pageLayout) {
            return <div>!pageLayout</div>;
        }
    }
}
