import React, { createElement, useEffect, Fragment } from "react";

import { SkiplinkwidgetContainerProps } from "../typings/SkiplinkwidgetProps";

import "./ui/Skiplinkwidget.css";

const ID_TO_ADD_TO_ELEMENT = "MAIN_CONTENT_SKIP_TO";
const ID_FOR_SKIP_LINK = "skip_link";

const Skiplinkwidget: React.FC<SkiplinkwidgetContainerProps> = ({ before, addButtonTo, mainContentArea }) => {
    useEffect(() => {
        addSkipLinkButton();
        findMainContentAndAddIdToIt();
    });

    const addSkipLinkButton = (): void => {
        const foundSkipLink = document.getElementById(ID_FOR_SKIP_LINK);
        if (foundSkipLink) {
            foundSkipLink.remove();
        }
        // Create Skip Link Div
        const newDiv = document.createElement("div");
        // Create Skip Link Button
        const button = document.createElement("button");
        // Skip Link Text
        button.textContent = "Skip to main content";
        // Function To Go To Main Content
        button.onclick = () => onClickFunction();
        // Set Id
        button.setAttribute("id", ID_FOR_SKIP_LINK);
        // Set Classnames
        button.setAttribute("class", "btn");
        // Set Role
        button.setAttribute("role", "link");
        // add A Tag to Created Div
        newDiv.appendChild(button);

        let mainButtonElementToTarget: HTMLCollectionOf<Element>;
        // If user specifies class name to target
        if (addButtonTo) {
            mainButtonElementToTarget = document.getElementsByClassName(addButtonTo);
        } else {
            mainButtonElementToTarget = document.getElementsByClassName("navbar-brand");
        }
        if (!mainButtonElementToTarget.length) {
            throw new Error("addButtonTo class not found");
        }
        if (before) {
            mainButtonElementToTarget[0].before(newDiv);
        } else {
            mainButtonElementToTarget[0].after(newDiv);
        }
    };

    const findMainContentAndAddIdToIt = (): void => {
        let mainArea: HTMLCollectionOf<HTMLDivElement>;

        if (mainContentArea) {
            mainArea = document.getElementsByClassName(mainContentArea) as HTMLCollectionOf<HTMLDivElement>;
        } else {
            mainArea = document.getElementsByClassName("region-content") as HTMLCollectionOf<HTMLDivElement>;
        }

        if (!mainArea.length) {
            throw new Error("Main Content Area class not found");
        }

        const mainAreaId: HTMLDivElement = mainArea[0];
        mainAreaId.id = ID_TO_ADD_TO_ELEMENT;
        mainAreaId.setAttribute("tabindex", "0");
    };

    const onClickFunction = (): void => {
        const mainAreaContent = document.getElementById(ID_TO_ADD_TO_ELEMENT);
        if (mainAreaContent) {
            mainAreaContent.focus();
        }
    };

    return <Fragment></Fragment>;
};

export default Skiplinkwidget;
