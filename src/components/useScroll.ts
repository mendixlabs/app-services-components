// https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

import { ScrollDirectionEnum } from "../types";

// Gets unique Class Name and Finds First Scrollable Child
export function getMendixScrollElement(scrollBodyClassName: string) {
    const mainScrollArea = document.getElementsByClassName(scrollBodyClassName);
    if (mainScrollArea && mainScrollArea.length) {
        const array = mainScrollArea[0].children;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (isScrollable(element)) {
                return element;
            }
        }
    }
}
// Finds If Element Is scrollable
function isScrollable(e: any) {
    if (e.scrollTopMax !== undefined) return e.scrollTopMax > 0;
    if (e == document.scrollingElement) return e.scrollHeight > e.clientHeight;
    return e.scrollHeight > e.clientHeight && ["scroll", "auto"].indexOf(getComputedStyle(e).overflowY) >= 0;
}

export function useMendixScroll(
    scrollBodyClassName: string,
    headerClassName: string,
    threshold: number,
    collapseHeaderClassName: string
) {
    const pageHeader = document.getElementsByClassName(headerClassName);
    const [scrollY, setScrollY] = useState<number | undefined>();
    const [thresholdReached, setThresholdReached] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirectionEnum>();
    const lastScrollTopRef = useRef(0);

    const listener = () => {
        const newScrollY = getMendixScrollElement(scrollBodyClassName)?.scrollTop;
        if (newScrollY) {
            setScrollY(newScrollY);
            setScrollDirection(
                lastScrollTopRef.current < newScrollY ? ScrollDirectionEnum.Down : ScrollDirectionEnum.Up
            );
            lastScrollTopRef.current = newScrollY;
        }
    };

    const delay = 10;
    console.log("thresholdReached", thresholdReached);
    useEffect(() => {
        if (getMendixScrollElement(scrollBodyClassName)) {
            const initialScrollY = getMendixScrollElement(scrollBodyClassName)?.scrollTop;
            setScrollY(initialScrollY);
            getMendixScrollElement(scrollBodyClassName)?.addEventListener("scroll", debounce(listener, delay));
            return () => getMendixScrollElement(scrollBodyClassName)?.removeEventListener("scroll", listener);
        } else {
            console.error("getMendixScrollElement(scrollBodyClassName) - Did Not Return anything");
        }
    }, []);

    useEffect(() => {
        if (scrollY && headerClassName && scrollDirection) {
            if (scrollY > threshold) {
                if (pageHeader && pageHeader.length) {
                    const foundPageHeader = pageHeader[0];
                    foundPageHeader.classList.add(collapseHeaderClassName);
                    setThresholdReached(true);
                }
            }
        }
        if (headerClassName && !scrollDirection) {
            if (pageHeader && pageHeader.length) {
                const foundPageHeader = pageHeader[0];
                foundPageHeader.classList.remove(collapseHeaderClassName);
                setThresholdReached(false);
            }
        }
    }, [scrollY, scrollDirection]);
    return [scrollY, scrollDirection];
}
