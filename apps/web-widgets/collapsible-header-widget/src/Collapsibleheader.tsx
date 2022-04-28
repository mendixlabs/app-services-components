import { Component, ReactNode, createElement } from "react";
import { PageLayoutScroll } from "./components/PageLayoutScroll";

import { CollapsiblewebheaderContainerProps } from "../typings/CollapsiblewebheaderProps";

export default class Collapsiblewebheader extends Component<CollapsiblewebheaderContainerProps> {
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
