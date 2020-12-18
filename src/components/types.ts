import { ListWidgetValue } from "mendix";
import { ReactNode } from "react";
export type CompState = {
    listOfSortableItems: ListOfSortableItemsType[];
};
export type ListOfSortableItemsType = {
    id?: string;
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
    listOfSortableItems?: ListOfSortableItemsType[];
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
    emptyData?: ReactNode;
    content?: ListWidgetValue;
    reorderAfterDrop: ({ currentItem, index }: ReorderAfterDropTypes) => void;
};
