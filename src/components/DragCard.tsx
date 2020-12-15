import { createElement, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragCardType } from "./types";

const DragCard = ({ children, item, index, reorderAfterDrop }: DragCardType) => {
    const ref = useRef(null);
    // REORDER THE CARDS
    const [{ isOver }, drop] = useDrop({
        accept: "card",
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
        drop(hoverItem) {
            const currentItem = hoverItem;
            reorderAfterDrop({
                // @ts-ignore
                currentItem,
                index
            });
        }
    });
    console.log("isOver", isOver);
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: "card",
            item,
            index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div className={isDragging ? "isDragging" : ""} ref={ref}>
            {children}
        </div>
    );
};

export default DragCard;
