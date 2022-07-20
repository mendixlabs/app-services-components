import { createElement, useMemo, useRef, FunctionComponent } from "react";
import { useDrop } from "react-dnd";
import { getClassNames } from "../utils/general";

import type { Type_Scroll_Helper } from "../userTypes";

const ScrollHelper: FunctionComponent<Type_Scroll_Helper> = props => {
    const ref = useRef<HTMLDivElement>(null);
    const classNames = useMemo(() => getClassNames(props.droppedOnUUID), [props.droppedOnUUID]);

    const [{ isOver }, drop] = useDrop({
        accept: [props.droppedOnUUID, ...props.acceptedUUids],
        collect(monitor) {
            return {
                isOver: monitor.isOver()
            };
        },
        hover(_item, monitor) {
            const clientOffset = monitor.getClientOffset();
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const parentBoundingRect = props.parentContainerName.current?.getBoundingClientRect();
            if (hoverBoundingRect && clientOffset) {
                if (props.isColumn) {
                    const distanceToBottom = hoverBoundingRect?.bottom - clientOffset.y;
                    const distanceToTop = clientOffset.y - hoverBoundingRect?.top;
                    if (parentBoundingRect) {
                        const distanceToParentRight = parentBoundingRect?.right - clientOffset.x;
                        const distanceToParentLeft = clientOffset.x - parentBoundingRect?.left;
                        // TODO -> Maybe we should explore the idea to use ratios % and not -
                        if (distanceToParentRight < 300) {
                            props.parentContainerName.current?.scrollBy(50, 0);
                        }
                        if (distanceToParentLeft < 300) {
                            props.parentContainerName.current?.scrollBy(-50, 0);
                        }
                    }
                    if (distanceToBottom < 50) {
                        ref.current?.scrollBy(0, 10);
                    }
                    if (distanceToTop < 50) {
                        ref.current?.scrollBy(0, -20);
                    }
                } else {
                    const distanceToRight = hoverBoundingRect?.right - clientOffset.x;
                    const distanceToLeft = clientOffset.x - hoverBoundingRect?.left;
                    if (distanceToRight < 100) {
                        ref.current?.scrollBy(10, 0);
                    }
                    if (distanceToLeft < 200) {
                        ref.current?.scrollBy(-10, 0);
                    }
                }
            }
        }
    });

    drop(ref);

    return (
        <div
            ref={ref}
            id={`${props.droppedOnUUID}`}
            className={`scroll_helper ${props.droppedOnUUID} ${
                isOver ? classNames.dnd_at_end_over : classNames.dnd_at_end_not_over
            }
            ${
                props.isDragging
                    ? classNames.dnd_draggable_container_dragging
                    : classNames.dnd_draggable_container_not_dragging
            }
            `}
            style={{
                flex: 1,
                display: "flex",
                width: "100%",
                flexDirection: props.isColumn ? "column" : "row"
            }}
        >
            {props.children}
        </div>
    );
};

export default ScrollHelper;
