// https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

import { ScrollDirectionEnum, HeaderStatusEnum } from "../types";

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
    collapseHeaderClassName: string,
    smartCompensator: boolean,
    animationSpeed: number | undefined,
    expandOnLessThreshold: boolean
) {
    const pageHeader = document.getElementsByClassName(headerClassName);
    const [scrollY, setScrollY] = useState<number | undefined>();
    const [changeInHeader, setChangeInHeader] = useState<number | undefined>();
    const [headerStatus, setHeaderStatus] = useState<HeaderStatusEnum>();
    const [thresholdReached, setThresholdReached] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirectionEnum>();
    const lastScrollTopRef = useRef(0);

    const listener = () => {
        const newScrollY = getMendixScrollElement(scrollBodyClassName)?.scrollTop;
        if (newScrollY) {
            setScrollDirection(
                lastScrollTopRef.current < newScrollY ? ScrollDirectionEnum.Down : ScrollDirectionEnum.Up
            );
            setScrollY(newScrollY);
            lastScrollTopRef.current = newScrollY;
        }
    };

    const delay = 0;
    // useEffect
    useEffect(() => {
        const scrollElement = getMendixScrollElement(scrollBodyClassName);
        if (scrollElement) {
            const initialScrollY = scrollElement?.scrollTop;
            setScrollY(initialScrollY);
            scrollElement?.addEventListener("scroll", debounce(listener, delay));
            return () => scrollElement?.removeEventListener("scroll", listener);
        } else {
            console.error("getMendixScrollElement(scrollBodyClassName) - Did Not Return anything");
        }
    }, []);

    useEffect(() => {
        const scrollElement = getMendixScrollElement(scrollBodyClassName);
        const currentScrollHeight = scrollElement?.getBoundingClientRect().height;
        if (pageHeader && pageHeader.length) {
            const foundPageHeader = pageHeader[0];
            if (scrollY && headerClassName && scrollDirection) {
                if (scrollY > threshold) {
                    //&& !thresholdReached Fixes multi Page Issue
                    foundPageHeader.classList.add(collapseHeaderClassName);
                    _smartCompensation(currentScrollHeight);
                    setThresholdReached(true);
                }
            }
            if (expandOnLessThreshold) {
                if (scrollY && scrollY < threshold) {
                    //&& !thresholdReached Fixes multi Page Issue
                    foundPageHeader.classList.remove(collapseHeaderClassName);
                    _smartCompensation(currentScrollHeight);
                    setThresholdReached(false);
                }
            } else {
                if (headerClassName && !scrollDirection) {
                    const foundClassNameOnHeader = foundPageHeader.classList.value;
                    if (foundClassNameOnHeader.includes(collapseHeaderClassName)) {
                        foundPageHeader.classList.remove(collapseHeaderClassName);
                        _smartCompensation(currentScrollHeight, true);
                        setThresholdReached(false);
                    }
                }
            }
        }
    }, [scrollY]);
    const _getCurrentHeaderHeight = (): number | undefined => {
        if (pageHeader) {
            const foundPageHeader = pageHeader[0];
            const pageHeaderHeight = foundPageHeader?.getBoundingClientRect().height;
            return pageHeaderHeight;
        }
        return undefined;
    };

    const _smartCompensation = (currentScrollHeight: number | undefined, noTimeout = false): void => {
        if (smartCompensator) {
            const animationTime = animationSpeed ? animationSpeed : 500;
            const TIMEOUT_TIME = noTimeout ? 0 : animationTime / 4;
            const scrollElement = getMendixScrollElement(scrollBodyClassName);
            const pageHeaderHeightBeforeScroll = _getCurrentHeaderHeight();
            setTimeout(() => {
                const pageHeaderHeightAfterScroll = _getCurrentHeaderHeight();
                if (currentScrollHeight && pageHeaderHeightBeforeScroll && pageHeaderHeightAfterScroll) {
                    if (scrollDirection && headerStatus == HeaderStatusEnum.Expanded) {
                        const changeInHeader = pageHeaderHeightBeforeScroll - pageHeaderHeightAfterScroll;
                        setChangeInHeader(changeInHeader);
                        setHeaderStatus(HeaderStatusEnum.Collapsed);
                        scrollElement?.setAttribute(
                            "style",
                            `height: ${currentScrollHeight +
                                (pageHeaderHeightBeforeScroll - pageHeaderHeightAfterScroll)}px`
                        );
                    }
                    if (!scrollDirection && headerStatus == HeaderStatusEnum.Collapsed) {
                        setHeaderStatus(HeaderStatusEnum.Expanded);
                        changeInHeader &&
                            scrollElement?.setAttribute("style", `height: ${currentScrollHeight - changeInHeader}px`);
                    }
                }
            }, TIMEOUT_TIME as number);
        }
    };
    return [scrollY, scrollDirection, thresholdReached];
}
