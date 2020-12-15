import { createElement } from "react";
import DragCard from "./DragCard";
import { DragListProps, ListOfSortableItemsType } from "./types";

function Column({ listOfSortableItems, content, reorderAfterDrop }: DragListProps) {
    return (
        <div className="app">
            {listOfSortableItems.length ? (
                listOfSortableItems.map((fullItem: ListOfSortableItemsType, index: number) => {
                    return (
                        <DragCard reorderAfterDrop={reorderAfterDrop} item={fullItem} index={index}>
                            {content && content(fullItem.item)}
                        </DragCard>
                    );
                })
            ) : (
                <DragCard reorderAfterDrop={reorderAfterDrop} item={undefined} index={0}>
                    <div
                        style={{
                            border: "1px solid",
                            padding: 10
                        }}
                    >
                        Empty Drop
                    </div>
                </DragCard>
            )}
        </div>
    );
}

export default Column;
