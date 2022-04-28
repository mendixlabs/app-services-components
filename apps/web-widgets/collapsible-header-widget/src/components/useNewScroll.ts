import { PageLayoutScrollTypes, ScrollDirectionEnum, HeaderStatusEnum } from "../types";

import { useEffect, useState, useRef } from "react";
import throttle from "lodash/throttle";

export function useScroll({
    threshold,
    animationSpeed,
    headerClassName,
    smartCompensator,
    reactOnClassName,
    scrollBodyClassName,
    expandOnLessThreshold,
    reactOnClassNameToAdd,
    collapseHeaderClassName
}: PageLayoutScrollTypes) {
    const [initializer, setInitializer] = useState<boolean>(false);
    const [pageHeader, setPageHeader] = useState<any>();
    const [scrollabileElement, setScrollabileElement] = useState<any>();
    const [scrollY, setScrollY] = useState<number | undefined>();
    const [pageHeaderHeightBeforeScroll, setPageHeaderHeightBeforeScroll] = useState<number | undefined>();
    const [changeInHeader, setChangeInHeader] = useState<number | undefined>();
    const [headerStatus, setHeaderStatus] = useState<HeaderStatusEnum>(HeaderStatusEnum.Expanded);
    const [thresholdReached, setThresholdReached] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirectionEnum>();
    const lastScrollTopRef = useRef(0);

    async function findMendixScrollElement() {
        const _pageHeader = document.getElementsByClassName("headID");
        setPageHeader(_pageHeader);

        const mainScrollArea = document.getElementsByClassName(scrollBodyClassName);
        if (mainScrollArea && mainScrollArea.length) {
            const array = mainScrollArea[0].children as any;
            return await recursivelyFindChildNodes(array);
        }
    }
    const recursivelyFindChildNodes = (data: any): any => {
        for (const element of data) {
            const _ans = isScrollable(element);
            if (_ans) {
                if (scrollabileElement !== element) {
                    return setScrollabileElement(element);
                }
            } else {
                if (element.children.length) {
                    return recursivelyFindChildNodes([element.children[element.children.length - 1]]);
                }
            }
        }
    };

    function isScrollable(e: any) {
        if (e.scrollTopMax !== undefined) {
            return e.scrollTopMax > 0;
        }
        if (e === document.scrollingElement) {
            return e.scrollHeight > e.clientHeight;
        }
        return e.scrollHeight > e.clientHeight && ["scroll", "auto"].indexOf(getComputedStyle(e).overflowY) >= 0;
    }

    const _classNamesToHide = (toAddClassName: boolean): void => {
        if (reactOnClassName && reactOnClassNameToAdd) {
            const foundClassNames = document.getElementsByClassName(reactOnClassName);
            for (const element of foundClassNames as any) {
                if (toAddClassName) {
                    element.classList.add(reactOnClassNameToAdd);
                } else {
                    element.classList.remove(reactOnClassNameToAdd);
                }
            }
        }
    };
    const _throttleSmartCompensation = throttle((a: any, b: any): void => {
        _smartCompensation(a, b);
    }, 100);

    const setupScrollElement = async () => {
        if (initializer) {
            await findMendixScrollElement();
        }
    };

    const listener = (): void => {
        const newScrollY = scrollabileElement?.scrollTop;
        if (newScrollY) {
            setScrollDirection(
                lastScrollTopRef.current < newScrollY ? ScrollDirectionEnum.Down : ScrollDirectionEnum.Up
            );
            setScrollY(newScrollY);
            lastScrollTopRef.current = newScrollY;
        }
    };
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
            const TIMEOUT_TIME = noTimeout ? 0 : animationTime * 0.8; // Timing Issue Maybe
            const scrollElement = scrollabileElement;
            setTimeout(() => {
                const pageHeaderHeightAfterScroll = _getCurrentHeaderHeight();

                if (currentScrollHeight && pageHeaderHeightBeforeScroll && pageHeaderHeightAfterScroll) {
                    if (scrollDirection && headerStatus === HeaderStatusEnum.Expanded) {
                        const changeInHeader = pageHeaderHeightBeforeScroll - pageHeaderHeightAfterScroll;
                        setChangeInHeader(changeInHeader);
                        setHeaderStatus(HeaderStatusEnum.Collapsed);
                        return scrollElement?.setAttribute(
                            "style",
                            `height: ${currentScrollHeight + changeInHeader}px; overflow: auto;`
                        );
                    }
                    if (!scrollDirection && headerStatus === HeaderStatusEnum.Collapsed) {
                        setHeaderStatus(HeaderStatusEnum.Expanded);
                        return (
                            changeInHeader &&
                            scrollElement?.setAttribute(
                                "style",
                                `height: ${currentScrollHeight - changeInHeader}px; overflow: auto;`
                            )
                        );
                    }
                }
            }, TIMEOUT_TIME as number);
        }
    };
    const setupScroller = () => {
        if (initializer && scrollabileElement) {
            if (scrollabileElement) {
                const initialScrollY = scrollabileElement?.scrollTop;
                setScrollY(initialScrollY);
                const headerHeightStart = _getCurrentHeaderHeight();
                setPageHeaderHeightBeforeScroll(headerHeightStart);
                //@ts-ignore
                return scrollabileElement?.addEventListener("scroll", listener);
            } else {
                console.error("getMendixScrollElement(scrollBodyClassName) - Did Not Return anything");
            }
            //@ts-ignore
            return () => scrollabileElement.removeEventListener("scroll", listener);
        }
    };
    useEffect(() => {
        if (initializer) {
            setTimeout(() => {
                setupScrollElement();
            }, 100);
        }
    }, [initializer]);

    useEffect(() => {
        if (initializer) {
            setupScroller();
        }
    }, [scrollabileElement]);

    useEffect(() => {
        if (initializer && scrollabileElement) {
            const scrollElement = scrollabileElement;
            const currentScrollHeight = scrollElement?.getBoundingClientRect().height;
            if (pageHeader && pageHeader.length) {
                const foundPageHeader = pageHeader[0];
                if (scrollY && headerClassName && scrollDirection) {
                    if (scrollY > threshold) {
                        foundPageHeader.classList.add(collapseHeaderClassName);
                        _throttleSmartCompensation(currentScrollHeight, false);
                        _classNamesToHide(true);
                        setThresholdReached(true);
                    }
                }
                if (expandOnLessThreshold) {
                    if (scrollY && scrollY < threshold) {
                        foundPageHeader.classList.remove(collapseHeaderClassName);
                        _classNamesToHide(false);
                        _throttleSmartCompensation(currentScrollHeight, false);
                        setThresholdReached(false);
                    }
                } else {
                    if (headerClassName && !scrollDirection) {
                        const foundClassNameOnHeader = foundPageHeader.classList.value;
                        if (foundClassNameOnHeader.includes(collapseHeaderClassName)) {
                            foundPageHeader.classList.remove(collapseHeaderClassName);
                            _classNamesToHide(false);
                            _throttleSmartCompensation(currentScrollHeight, true);
                            setThresholdReached(false);
                        }
                    }
                }
            }
            // When User Navigates Resets Values - Mendix is SPA
            if (scrollY && scrollY < threshold) {
                setHeaderStatus(HeaderStatusEnum.Expanded);
                const headerHeightStart = _getCurrentHeaderHeight();
                setPageHeaderHeightBeforeScroll(headerHeightStart);
            }
        }
    }, [scrollY]);

    return { scrollY, scrollDirection, thresholdReached, setInitializer, findMendixScrollElement, initializer };
}
