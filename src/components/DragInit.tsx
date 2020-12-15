import { createElement, useRef } from "react";
// import "./App.css";
import { useDrag, useDrop } from "react-dnd";

function Card({ children, item, index, reorderAfterDrop }: any) {
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
    console.log("isDragging", isDragging);
    drag(drop(ref));
    return (
        <div className={isDragging ? "isDragging" : ""} ref={ref}>
            {children}
        </div>
    );
}

function Column({ listOfSortableItems, content, reorderAfterDrop }: any) {
    return (
        <div className="app">
            {listOfSortableItems.length ? (
                listOfSortableItems.map((fullItem: any, index: any) => {
                    return (
                        <Card reorderAfterDrop={reorderAfterDrop} item={fullItem} index={index}>
                            {content(fullItem.item)}
                        </Card>
                    );
                })
            ) : (
                <Card reorderAfterDrop={reorderAfterDrop} item={null} index={0}>
                    <div
                        style={{
                            border: "1px solid",
                            padding: 10
                        }}
                    >
                        Empty Drop
                    </div>
                </Card>
            )}
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
