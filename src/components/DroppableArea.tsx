import { createElement, useMemo, useRef } from "react";
import { useDrop } from "react-dnd";

import { getClassNames } from "../utils/general";
import { Custom_DragObject, Type_Content_Area_Props } from "../userTypes";

const DroppableArea = (props: Type_Content_Area_Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const classNames = useMemo(() => getClassNames(props.droppedOnUUID), [props.droppedOnUUID]);

    const [{ isOver }, drop] = useDrop({
        accept: props.droppedOnUUID,
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            };
        },
        drop(item, monitor) {
            /**
             * Runs correct Microflow to Save changes
             */
            if (isOver && monitor.canDrop()) {
                props.onDrop({
                    currentParentUUID: (item as Custom_DragObject).item.item.uuidParent,
                    draggedUUID: (item as Custom_DragObject).item.item.uuidCurrent,
                    droppedOnParentUUID: props.uuidStringParent,
                    index: props.index,
                    droppedOnUUID: ""
                });
            }
        }
    });

    return (
        <div
            ref={drop}
            className={classNames.dnd_draggable_container_droppable}
            style={{
                height: "100%",
                width: "100%"
            }}
        >
            {props.children}
        </div>
    );
};

export default DroppableArea;
