import { createElement, FC } from "react";
import { ScreenShotContainerProps } from "../typings/ScreenShotProps";
import { jsPDF } from "jspdf";
import { toCanvas } from "html-to-image";

import "./ui/ScreenShot.css";
import { getToday } from "./utils";

const PAGE_MARGIN = 10;
const BACKGROUND_COLOR = "#fff";

const ScreenShot: FC<ScreenShotContainerProps> = props => {
    const onClick = async () => {
        const doc = new jsPDF({ orientation: "p", unit: "px", format: "a4", hotfixes: ["px_scaling"] });

        // Get Accurate PX size of A4 page
        const { pageSize } = doc.internal;
        const pageWidth = pageSize.getWidth();
        const pageHeight = pageSize.getHeight();

        const foundPrintableClassName = document.getElementsByClassName(props.classNameToFound)[0] as HTMLElement;

        if (!foundPrintableClassName) {
            throw new Error("No Printable Class name found");
        }

        /**
         * 🤔 Method for this inspired/stolen/found from https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer/34934497#34934497
         */

        // HTML to CANVAS
        const htmlCanvas = await toCanvas(foundPrintableClassName, { backgroundColor: BACKGROUND_COLOR });

        // Helper to get Ratio Correct
        const pageHeightRatio = (htmlCanvas.width * (pageHeight - PAGE_MARGIN * 2)) / (pageWidth - PAGE_MARGIN * 2);

        const amountOfPagesNeeded = Math.ceil(htmlCanvas.height / pageHeightRatio);

        // Canvas Height
        let canvasHeight = htmlCanvas.height;
        // Pages Count
        let pagesAdded = 1; // jsPDF stars on 1 page

        while (canvasHeight >= 0) {
            const pageDifference = htmlCanvas.height - canvasHeight;
            /**
             * Create new Canvas to fill out A4 page
             */
            const pageCanvas = document.createElement("canvas");

            //Set Empty Canvas Height and Widget to the of A4 Page
            pageCanvas.width = pageWidth;
            pageCanvas.height = pageHeight;
            // Get context of Canvas

            const ctx = await pageCanvas.getContext("2d");

            if (!ctx) {
                return;
            }

            // Set Background to White (TODO for PNG ect. we would want to expand this)
            ctx.fillStyle = BACKGROUND_COLOR;
            // Draw a White square the size of an A4 Page
            await ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            // Draw image on our created Canvas
            await ctx.drawImage(
                htmlCanvas,
                0, // sx No Clipping
                pageDifference, // sy No Clipping
                htmlCanvas.width, // sWidth Width of IMG
                pageHeightRatio, // sHeight Width of IMG
                PAGE_MARGIN, // x - coordinate to place IMG -> Results in 20px margin L&R
                PAGE_MARGIN, // y - coordinate to place IMG -> Results in 20px margin T&B
                pageCanvas.width - PAGE_MARGIN * 2,
                pageCanvas.height - PAGE_MARGIN * 2
            );
            // Covert Canvas to JPEG
            const pageImgData = await pageCanvas.toDataURL("image/jpeg", 1.0);
            // Add Image to PDF
            doc.addImage(pageImgData, "JPEG", 0, 0, 0, 0);
            //Update Canvas left to print
            canvasHeight = canvasHeight - pageHeightRatio;
            if (pagesAdded < amountOfPagesNeeded) {
                pagesAdded = pagesAdded + 1;
                doc.addPage();
            }
        }
        // Add Save PDF
        doc.save(`${props.prefixPageName}_${getToday()}.pdf`);
    };

    return <div onClick={onClick}>{props.printButton}</div>;
};

export default ScreenShot;
