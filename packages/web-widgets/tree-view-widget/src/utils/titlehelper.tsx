import { TitleDataSourceType, Nanoflow } from "../../typings/TreeViewProps";
import { Action, ActionReturn } from "../TreeView";
import { ReactNode, createElement, ReactElement } from "react";

import TemplateComponent from "react-mustache-template-component";

export type ClickCellType = "single" | "double";

export interface GetTitleOptions {
    titleType: TitleDataSourceType;
    attribute?: string;
    nanoflow?: Nanoflow;
    executeAction?: (action: Action, showError: boolean, obj?: mendix.lib.MxObject) => Promise<ActionReturn>;
    renderAsHTML?: boolean;
}

export const getDynamicTitleFromObject = async (
    obj: mendix.lib.MxObject,
    opts: GetTitleOptions
): Promise<ReactNode> => {
    let titleText = "";

    try {
        if (obj) {
            const { titleType, nanoflow, executeAction } = opts;

            if (titleType === "nanoflow" && nanoflow && nanoflow.nanoflow && executeAction) {
                titleText = (await executeAction({ nanoflow }, true, obj)) as string;
            }
        }
    } catch (e) {
        console.warn(e);
        titleText = "";
    }

    if (titleText === "") {
        titleText = "\u00A0";
    }

    if (opts.renderAsHTML) {
        return <TemplateComponent template={titleText} type="div" />;
    }

    return <span>{titleText}</span>;
};

export const getStaticTitleFromObject = (obj: mendix.lib.MxObject, opts: GetTitleOptions): ReactElement => {
    let titleText = "";

    try {
        if (obj) {
            const { titleType, attribute } = opts;

            if (titleType === "attribute" && attribute) {
                titleText = obj.get(attribute) as string;
            }
        }
    } catch (e) {
        console.warn(e);
        titleText = "";
    }

    if (titleText === "") {
        titleText = "\u00A0";
    }

    if (opts.renderAsHTML) {
        return <TemplateComponent template={titleText} type="div" />;
    }

    return <span>{titleText}</span>;
};
