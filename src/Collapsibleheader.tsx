import { Component, ReactNode, createElement } from "react";
import PageLayoutScroll from "./components/PageLayoutScroll";

import { CollapsibleheaderContainerProps } from "../typings/CollapsibleheaderProps";

import "./ui/Collapsibleheader.css";

export default class Collapsibleheader extends Component<CollapsibleheaderContainerProps> {
    render(): ReactNode {
        const {
            threshold,
            animationSpeed,
            headerClassName,
            smartCompensator,
            reactOnClassName,
            scrollBodyClassName,
            reactOnClassNameToAdd,
            expandOnLessThreshold,
            collapseHeaderClassName
        } = this.props;

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
}
