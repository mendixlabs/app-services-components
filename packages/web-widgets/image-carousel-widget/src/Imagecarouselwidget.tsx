import { createElement, Fragment, useEffect, useState, CSSProperties, ReactNode } from "react";
import { ImagecarouselwidgetContainerProps } from "../typings/ImagecarouselwidgetProps";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./ui/Imagecarouselwidget.css";
// http://localhost:3000/file?guid=8162774324609325&changedDate=1614241267582
const Imagecarouselwidget = (props: ImagecarouselwidgetContainerProps): ReactNode => {
    const {
        content,
        autoPlay,
        maxWidth,
        swipeable,
        maxHeight,
        showArrows,
        stopOnHover,
        incomingData,
        infiniteLoop,
        dynamicHeight,
        showIndicators,
        useKeyboardArrows
    } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * I don't want setTimeout's either but react-responsive-carousel creates some issues when loading (Race Conditions). This solves It.
         */
        if (props.incomingData.status === "available") {
            setTimeout(() => {
                setLoading(false);
            }, 0);
        }
    }, [incomingData.status]);

    const arrowStyles: CSSProperties = {
        position: "absolute",
        zIndex: 2,
        top: "calc(50% - 15px)",
        fontSize: 22,
        cursor: "pointer",
        color: "#0595DB"
    };

    console.log("maxWidth", maxWidth);
    return (
        <div style={{ maxWidth: maxWidth ? maxWidth : "none", margin: "0 auto" }}>
            {!loading && (
                <Carousel
                    showThumbs={false}
                    autoPlay={autoPlay}
                    swipeable={swipeable}
                    showArrows={showArrows}
                    stopOnHover={stopOnHover}
                    infiniteLoop={infiniteLoop}
                    dynamicHeight={dynamicHeight}
                    showIndicators={showIndicators}
                    useKeyboardArrows={useKeyboardArrows}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <span
                                onClick={onClickHandler}
                                title={label}
                                className="Image-Carousel__Prev"
                                style={{ ...arrowStyles, left: 15 }}
                            >
                                {"<"}
                            </span>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <span
                                onClick={onClickHandler}
                                title={label}
                                className="Image-Carousel__Next"
                                style={{ ...arrowStyles, right: 15 }}
                            >
                                {">"}
                            </span>
                        )
                    }
                >
                    {incomingData.items?.map((item: any, i: number) => {
                        return (
                            <Fragment key={i}>
                                <img
                                    style={{
                                        maxHeight: maxHeight ? maxHeight : "auto",
                                        width: maxHeight ? "auto" : "100%"
                                    }}
                                    src={`${window.location.origin}/file?guid=${item.id}`}
                                />
                                <div className={`Image-Carousel__Content Image-Carousel__Content__${i}`}>
                                    {content(item)}
                                </div>
                            </Fragment>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};
export default Imagecarouselwidget;
