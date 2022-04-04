import { createElement, useMemo } from "react";
import { usePreview } from "react-dnd-preview";

import { Type_Card_Props, Type_DragPreview_Props } from "../userTypes";
import { getClassNames } from "../utils/general";

const DragPreview = (props: Type_DragPreview_Props) => {
    const { display, item, style } = usePreview();

    const classNames = useMemo(
        () => getClassNames((item?.item as Type_Card_Props)?.item.uuidContainer),
        [(item?.item as Type_Card_Props)?.item.uuidContainer]
    );

    if (!display) {
        return null;
    }
    if (display && item.type === props.uuidStringContainer) {
        return (
            <div
                className={`${classNames.dnd_drag_preview_container}`}
                style={{
                    ...style,
                    width: (item.item as any).ref.current?.getBoundingClientRect().width,
                    height: (item.item as any).ref.current?.getBoundingClientRect().height
                }}
            >
                <div className={`${classNames.dnd_draggable_item}${classNames.dnd_drag_preview_item}`}>
                    {props.displayItem.get((item.item as Type_Card_Props).item.item)}
                </div>
            </div>
        );
    }
    return null;
};

export default DragPreview;
