import { createElement, useMemo } from "react";
import { useDrop } from "react-dnd";

import { getClassNames } from "../utils/general";
import { Custom_DragObject, Type_Content_Area_Props } from "../userTypes";

const DroppableArea = (props: Type_Content_Area_Props) => {
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
            data-dnd-name={"Empty Item Container"}
            ref={drop}
            className={`${classNames.dnd_draggable_container_droppable} ${
                isOver ? classNames.dnd_at_end_over : classNames.dnd_at_end_not_over
            }`}
            style={{
                flex: 1
            }}
        >
            {props.children}
        </div>
    );
};

export default DroppableArea;
