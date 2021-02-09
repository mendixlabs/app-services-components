import { Component, ReactNode, createElement } from "react";
import PageLayoutScroll from "./components/PageLayoutScroll";

import { collapsibleheaderContainerProps } from "../typings/collapsibleheaderProps";

import "./ui/Collapsibleheader.css";

export default class collapsibleheader extends Component<collapsibleheaderContainerProps> {
    render(): ReactNode {
        const {
            threshold,
            pageLayout,
            animationSpeed,
            headerClassName,
            smartCompensator,
            reactOnClassName,
            scrollBodyClassName,
            reactOnClassNameToAdd,
            expandOnLessThreshold,
            collapseHeaderClassName
        } = this.props;

        if (pageLayout) {
            return (
                <PageLayoutScroll
                    threshold={threshold}
                    animationSpeed={animationSpeed}
                    headerClassName={headerClassName}
                    smartCompensator={smartCompensator}
                    reactOnClassName={reactOnClassName}
                    scrollBodyClassName={scrollBodyClassName}
                    reactOnClassNameToAdd={reactOnClassNameToAdd}
                    expandOnLessThreshold={expandOnLessThreshold}
                    collapseHeaderClassName={collapseHeaderClassName}
                />
            );
        }
        if (!pageLayout) {
            return <div>!pageLayout</div>;
        }
    }
}
