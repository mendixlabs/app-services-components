import { createElement, useRef } from "react";
import { useDrag, useDrop, DragObjectWithType, DragSourceMonitor } from "react-dnd";
import { DragCardType, ListOfSortableItemsType } from "./types";

const DragCard = ({ children, item, index, reorderAfterDrop, listOfSortableItems }: DragCardType) => {
    const ref = useRef<HTMLDivElement>(null);

    const findOrder = (hoverItem: any, monitor: DragSourceMonitor): number => {
        let hoverIndex;
        let dragIndex = hoverItem.index;
        hoverIndex = index;

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        // Get vertical middle
        if (clientOffset && hoverBoundingRect) {
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Dropped on the Top Halve of the Card
            if (hoverMiddleY > hoverClientY) {
                if (!hoverIndex) {
                    return hoverIndex;
                }
                return hoverIndex - 1;
            }
            // Dropped on the Bottom Halve of the Card
            if (hoverMiddleY < hoverClientY) {
                // Dropped in Empty Col
                if (hoverIndex == dragIndex && !listOfSortableItems) {
                    return hoverIndex;
                }
                // @ts-ignore
                if (!hoverIndex || hoverIndex == listOfSortableItems?.length - 1) {
                    return hoverIndex + 1;
                }
                return hoverIndex;
            }
            return hoverIndex;
        }

        return hoverIndex;
    };
    // REORDER THE CARDS
    const [{ isOver }, drop] = useDrop({
        accept: "mxObj",
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
        drop(hoverItem: DragObjectWithType, monitor: any) {
            const hoverIndex = findOrder(hoverItem, monitor);
            const currentItem = hoverItem as ListOfSortableItemsType;

            reorderAfterDrop({
                currentItem,
                index: hoverIndex
            });
        }
    });
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: "mxObj",
            item,
            index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div
            className={isDragging ? "isDragging" : ""}
            style={{
                padding: "0.5rem 1rem",
                marginBottom: ".5rem",
                cursor: "move",
                borderRadius: 10,
                border: "1px dashed",
                borderColor: isOver ? "#c6c6c6" : "#fff",
                backgroundColor: isDragging ? "#ddd" : "#fff"
            }}
            ref={ref}
        >
            {children}
        </div>
    );
};

export default DragCard;
