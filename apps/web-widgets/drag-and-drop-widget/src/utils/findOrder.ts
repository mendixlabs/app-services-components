import { DropTargetMonitor } from "react-dnd";
import { Type_Card_Props } from "../userTypes";

export type FindOrderType = {
    hoverItem: any;
    monitor: DropTargetMonitor;
    props: Type_Card_Props;
    ref: React.RefObject<HTMLDivElement>;
};
/**
 * Finds where the user Dropped the Item High or Low
 *
 * @returns Number
 */

export const findOrderOnDrop = ({ hoverItem, monitor, props, ref }: FindOrderType): number => {
    const hoverIndex = props.index;
    const currentIndex = hoverItem.item.index;
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
            return hoverIndex; // this was return hoverIndex - 1; I believe their should be difference between vertical and Horizontal lists
        }
        // Dropped on the Bottom Halve of the Card
        if (hoverMiddleY < hoverClientY) {
            // Dropped in Empty Col
            if (hoverIndex === currentIndex && !props.allData) {
                return hoverIndex;
            }

            if (!hoverIndex || hoverIndex === props.allData?.length - 1) {
                return hoverIndex + 1;
            }
            return hoverIndex;
        }
        return hoverIndex;
    }

    return hoverIndex;
};
