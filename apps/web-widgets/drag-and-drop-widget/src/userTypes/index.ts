import { ObjectItem, GUID, ListWidgetValue } from "mendix";
import { MutableRefObject, ReactNode } from "react";
import { DragObjectWithType } from "react-dnd";

export type Type_Card_Props = {
    id: string;
    index: number;
    isColumn: boolean;
    children: ReactNode;
    isDragging: boolean;
    canDrag: boolean;
    droppedOnUUID: string;
    acceptedUUids: string[];
    uuidStringParent: string;
    isOverIndex: number | null;
    item: Type_Parsed_Incoming_Data;
    onDrop: (x: OnDropTypes) => void;
    setIsOverIndex: (x: number | null) => void;
    setIsDragging: (x: boolean) => void;
    allData: Type_Parsed_Incoming_Data[];
};

export type Type_SpaceOnHover_Props = {
    id: string;
    width: number;
    height: number;
    isColumn: boolean;
    activateHeight: boolean;
    bg?: string;
};

export type Type_DragPreview_Props = {
    displayItem: ListWidgetValue;
    uuidStringContainer: string;
};

export type Type_Content_Area_Props = {
    id: string;
    index: number;
    isColumn: boolean;
    children?: ReactNode;
    droppedOnUUID: string;
    acceptedUUids: string[];
    uuidStringParent: string;
    onDrop: (x: OnDropTypes) => void;
};

export type OnDropTypes = {
    index: number;
    draggedUUID: string;
    droppedOnUUID: string;
    currentParentUUID: string;
    droppedOnParentUUID: string;
};
export type Type_Parsed_Incoming_Data = {
    id: GUID;
    index: number;
    item: ObjectItem;
    ariaTitle: string;
    uuidParent: string;
    uuidCurrent: string;
    ariaOfParent: string | undefined;
    isNewInHere: boolean;
    uuidContainer: string;
};

export type Enum_DND_ClassNames = {
    dnd_container: string;
    dnd_draggable_new: string;
    dnd_draggable_over: string;
    dnd_draggable_item: string;
    dnd_spacer: string;
    dnd_draggable_with_spacer: string;
    dnd_draggable_without_spacer: string;
    dnd_draggable_hover: string;
    dnd_container_inside: string;
    dnd_drag_preview_item: string;
    dnd_draggable_not_new: string;
    dnd_draggable_dragging: string;
    dnd_draggable_not_over: string;
    dnd_draggable_not_hover: string;
    dnd_draggable_not_dragging: string;
    dnd_drag_preview_container: string;
    dnd_draggable_container_dragging: string;
    dnd_draggable_container_droppable: string;
    dnd_draggable_container_not_dragging: string;
    dnd_at_end_not_over: string;
    dnd_at_end_over: string;
};
export interface Custom_DragObject extends DragObjectWithType {
    item: Type_Card_Props;
}

export type Type_Scroll_Helper = {
    children: JSX.Element;
    isColumn: boolean;
    droppedOnUUID: string;
    acceptedUUids: string[];
    isDragging: boolean;
    uuidStringParent: string;
    parentContainerName: MutableRefObject<HTMLDivElement | null>;
};
