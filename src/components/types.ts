import { ListWidgetValue } from "mendix";
import { ReactNode } from "react";
export type CompState = {
    myManager: any;
    listOfSortableItems: ListOfSortableItemsType[];
};
export type ListOfSortableItemsType = {
    id?: string;
    orderValue?: string;
    uuid?: string;
    item?: any;
};
export type NewElementDraggedIn = {
    modelToSaveFrom: string;
    dataSourceName: string;
    whereToPut: number;
    comingTo: string;
    item: any; // There must be a MX type?
    comingFrom: string;
};

export type DragCardType = {
    item?: ListOfSortableItemsType | undefined;
    index: number;
    reorderAfterDrop: ({ currentItem, index }: ReorderAfterDropTypes) => void;
    children: ReactNode;
};
export type ReorderAfterDropTypes = {
    currentItem: ListOfSortableItemsType;
    index: number;
};

export type DragListProps = {
    listOfSortableItems: ListOfSortableItemsType[];
    content?: ListWidgetValue;
    reorderAfterDrop: ({ currentItem, index }: ReorderAfterDropTypes) => void;
};
