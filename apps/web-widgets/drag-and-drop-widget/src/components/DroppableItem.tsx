import { createElement, useMemo, useRef, useState, CSSProperties, FunctionComponent } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { findOrder, getClassNames } from "../utils/general";
import SpaceOnHover from "./SpaceOnHover";

import type { Type_Card_Props } from "../userTypes";

const DroppableItem: FunctionComponent<Type_Card_Props> = props => {
    const ref = useRef<HTMLDivElement>(null);
    const [mouseOver, setMouseOver] = useState(false);
    const classNames = useMemo(() => getClassNames(props.item.uuidContainer), [props.item.uuidContainer]);
    const containerFlex = useMemo(() => {
        return { display: "flex", flexDirection: props.isColumn ? "column" : "row" };
    }, [props.isColumn]);
    const height = useMemo(() => ref.current?.getBoundingClientRect().height, [ref.current]);
    const width = useMemo(() => ref.current?.getBoundingClientRect().width, [ref.current]);

    const witchHalveHover = (_hoverItem: any, monitor: DropTargetMonitor): [boolean, boolean] => {
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        let isTopHalve = false;
        let isBottomHalve = false;

        // Get vertical middle
        if (clientOffset && hoverBoundingRect) {
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Dropped on the Top Halve of the Card
            if (hoverMiddleY > hoverClientY) {
                isTopHalve = true;
            }
            // Dropped on the Bottom Halve of the Card
            if (hoverMiddleY < hoverClientY) {
                isBottomHalve = true;
            }
        }
        return [isTopHalve, isBottomHalve];
    };
    // Props is dropped on
    const [{ isTopHalve, isBottomHalve, calculatedIndex, isNewParent, isOver, isAbove, isBelow }, drop] = useDrop({
        accept: [props.droppedOnUUID, ...props.acceptedUUids],
        collect(monitor) {
            const dragIndex = monitor.getItem()?.item.index ?? -1;
            const isNewParent = props.item.uuidParent !== monitor.getItem()?.item.item.uuidParent;
            const calculatedIndex = findOrder(monitor.getItem(), monitor, props.index, ref);
            const [isTopHalve, isBottomHalve] = witchHalveHover(monitor.getItem(), monitor);
            return {
                isOver: monitor.isOver(),
                calculatedIndex,
                isNewParent,
                isAbove: dragIndex > props.index,
                isBelow: dragIndex < props.index,
                isTopHalve,
                dragIndex,
                isBottomHalve
            };
        },

        drop() {
            /**
             * Runs microflow to Save changes
             */
            props.onDrop({
                droppedOnParentUUID: props.item.uuidParent,
                currentParentUUID: draggingItem.item.item.uuidParent,
                draggedUUID: draggingItem.item.item.uuidCurrent,
                droppedOnUUID: props.item.uuidCurrent,
                index: isNewParent ? (calculatedIndex as number) : props.index
            });
        }
    });
    const [{ draggingItem, isDragging }, drag] = useDrag({
        item: {
            type: props.droppedOnUUID,
            item: { ...props, ref }
        },
        canDrag: !props.canDrag,
        begin: () => {
            props.setIsDragging(true);
        },
        end: () => {
            props.setIsDragging(false);
        },
        collect: monitor => ({
            canDrag: monitor.canDrag(),
            isDragging: monitor.isDragging(),
            draggingItem: monitor.getItem()
        })
    });

    const showHoverStyle = mouseOver && !props.isDragging;

    drag(drop(ref));

    return (
        <div
            data-containing-uuid={props.droppedOnUUID}
            data-uuid={props.item.uuidCurrent}
            ref={ref}
            draggable="true"
            aria-label={props.item.ariaTitle + " inside " + props.item.ariaOfParent}
            aria-grabbed={isDragging ? "true" : "false"}
            style={{ ...(containerFlex as CSSProperties) }}
            className={`${isDragging ? classNames.dnd_draggable_dragging : classNames.dnd_draggable_not_dragging}`}
        >
            <div style={{ ...(containerFlex as CSSProperties), width: "100%" }}>
                <SpaceOnHover
                    id="isAbove"
                    isColumn={props.isColumn}
                    height={height as number}
                    width={width as number}
                    activateHeight={isNewParent ? isOver && isTopHalve : isOver && isAbove}
                />
                <div
                    tabIndex={0}
                    onMouseEnter={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    style={{ display: "flex", flexDirection: "column" }}
                    className={`${classNames.dnd_draggable_item}
                    ${isDragging ? classNames.dnd_draggable_dragging : classNames.dnd_draggable_not_dragging}
                    ${props.item.isNewInHere ? classNames.dnd_draggable_new : classNames.dnd_draggable_not_new}
                    ${isOver ? classNames.dnd_draggable_over : classNames.dnd_draggable_not_over}
                    ${showHoverStyle ? classNames.dnd_draggable_hover : classNames.dnd_draggable_not_hover}
                    `}
                >
                    {props.children}
                </div>
                <SpaceOnHover
                    id="isBelow"
                    isColumn={props.isColumn}
                    height={height as number}
                    width={width as number}
                    activateHeight={isNewParent ? isOver && isBottomHalve : isOver && isBelow}
                />
            </div>
            <div className={`${classNames.dnd_spacer}`}></div>
        </div>
    );
};

export default DroppableItem;
