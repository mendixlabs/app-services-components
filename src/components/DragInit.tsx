import { createElement } from "react";
import DragCard from "./DragCard";
import { DragListProps, ListOfSortableItemsType } from "./types";

function Column({ listOfSortableItems, content, reorderAfterDrop, emptyData }: DragListProps) {
    return (
        <div className="app">
            {listOfSortableItems.length ? (
                listOfSortableItems.map((fullItem: ListOfSortableItemsType, index: number) => {
                    return (
                        <DragCard
                            item={fullItem}
                            index={index}
                            reorderAfterDrop={reorderAfterDrop}
                            listOfSortableItems={listOfSortableItems}
                        >
                            {content && content(fullItem.item)}
                        </DragCard>
                    );
                })
            ) : (
                <DragCard reorderAfterDrop={reorderAfterDrop} item={undefined} index={0}>
                    <div>{emptyData}</div>
                </DragCard>
            )}
        </div>
    );
}

export default Column;
