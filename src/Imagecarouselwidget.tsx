import { createElement, Fragment, useEffect, useState } from "react";
import { ImagecarouselwidgetContainerProps } from "../typings/ImagecarouselwidgetProps";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./ui/Imagecarouselwidget.css";
// http://localhost:3000/file?guid=8162774324609325&changedDate=1614241267582
const Imagecarouselwidget = (props: ImagecarouselwidgetContainerProps) => {
    const {
        content,
        autoPlay,
        swipeable,
        maxHeight,
        showArrows,
        showThumbs,
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
    return (
        <div>
            {!loading && (
                <Carousel
                    autoPlay={autoPlay}
                    swipeable={swipeable}
                    showThumbs={showThumbs}
                    showArrows={showArrows}
                    stopOnHover={stopOnHover}
                    infiniteLoop={infiniteLoop}
                    dynamicHeight={dynamicHeight}
                    showIndicators={showIndicators}
                    useKeyboardArrows={useKeyboardArrows}
                >
                    {incomingData.items?.map((item: any) => {
                        return (
                            <Fragment>
                                <img
                                    style={{
                                        maxHeight: maxHeight ? maxHeight : "auto",
                                        width: maxHeight ? "auto" : "100%"
                                    }}
                                    src={`${window.location.origin}/file?guid=${item.id}`}
                                />
                                <h2 style={{ position: "absolute", top: 10, left: 10 }}>{content(item)}</h2>
                            </Fragment>
                        );
                    })}
                </Carousel>
            )}
        </div>
    );
};
export default Imagecarouselwidget;
