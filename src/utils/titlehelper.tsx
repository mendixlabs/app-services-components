import { TitleDataSourceType, Nanoflow } from "../../typings/TreeViewProps";
import { Action, ActionReturn } from "../TreeView";
import { fetchAttr } from "@jeltemx/mendix-react-widget-utils";
import { ReactNode, createElement } from "react";

import TemplateComponent from "react-mustache-template-component";

export type ClickCellType = "single" | "double";

export interface GetTitleOptions {
    titleType: TitleDataSourceType;
    attribute: string;
    nanoflow: Nanoflow;
    executeAction: (action: Action, showError: boolean, obj?: mendix.lib.MxObject) => Promise<ActionReturn>;
    renderAsHTML?: boolean;
}

export const getTitleFromObject = async (obj: mendix.lib.MxObject, opts: GetTitleOptions): Promise<ReactNode> => {
    let titleText = "";

    try {
        if (obj) {
            const { titleType, attribute, nanoflow, executeAction } = opts;

            if (titleType === "attribute" && attribute) {
                titleText = (await fetchAttr(obj, attribute)) as string;
            } else if (titleType === "nanoflow" && nanoflow && nanoflow.nanoflow) {
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
