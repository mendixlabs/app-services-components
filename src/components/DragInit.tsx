import { createElement, useRef } from "react";
// import "./App.css";
import { useDrag, useDrop } from "react-dnd";

function Card({ children, item, index, reorderAfterDrop }: any) {
    const ref = useRef(null);
    // REORDER THE CARDS
    const [, drop] = useDrop({
        accept: "card",
        // hover(hoverItem) {
        //     const currentItem = hoverItem;
        //     const hoverOverItem = item;
        //     reorderAfterDrop({
        //         // @ts-ignore
        //         currentOrderValue: currentItem.item.orderValue,
        //         newOrderValue: hoverOverItem.orderValue,
        //         currentItem
        //     });
        // }

        /**
         * This Hover is when  Card Is Dropped In Same Col
         */

        drop(hoverItem) {
            const currentItem = hoverItem;
            reorderAfterDrop({
                // @ts-ignore
                currentItem,
                index
            });
        }
    });

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
        <div
            className="card"
            ref={ref}
            style={{
                backgroundColor: isDragging ? "#fbb" : "palegoldenrod"
            }}
        >
            {children}
        </div>
    );
}

function Column({ listOfSortableItems, content, reorderAfterDrop }: any) {
    return (
        <div className="app">
            {listOfSortableItems.map((fullItem: any, index: any) => {
                return (
                    <Card reorderAfterDrop={reorderAfterDrop} item={fullItem} index={index}>
                        {content(fullItem.item)}
                    </Card>
                );
            })}
        </div>
    );
}

export default Column;
// import { createElement } from "react";
// import { useDrag, useDrop } from "react-dnd";

// const DragInit = ({ incomingData, content }: any) => {
//     return (
//         <div>
//             <Column>
//                 {incomingData.items?.map((item: any, index: any) => {
//                     return <MovableItem index={index}>{content(item)}</MovableItem>;
//                 })}
//             </Column>
//         </div>
//     );
// };

// export default DragInit;

// const MovableItem = ({ children, index }: any) => {
//     const [{ isDragging }, drag] = useDrag({
//         item: { name: index, type: "Irrelevant, for now" },
//         collect: monitor => ({
//             isDragging: monitor.isDragging()
//         })
//     });

//     const opacity = isDragging ? 0.4 : 1;

//     return (
//         <div ref={drag} className={`${index}_movable-item`} style={{ opacity }}>
//             {children}
//         </div>
//     );
// };

// const Column = ({ children }: any) => {
//     function moveCard(i: any) {
//         console.log("i", i);
//     }

//     const [{ isOver }, dropRef] = useDrop({
//         accept: "card",
//         drop: () => moveCard(),
//         collect: monitor => ({
//             isOver: !!monitor.isOver()
//         })
//     });

//     console.log("options", { isOver });

//     return <div ref={dropRef}>COL!{children}</div>;
// };
