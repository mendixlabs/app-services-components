import { createElement, forwardRef, Fragment } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { DND_OPTIONS } from "../utils/general";

interface MyDragInterface {
    children: any;
    uuidStringContainer: string;
}

const MyDragProvider = forwardRef<HTMLDivElement, MyDragInterface>(props => {
    return (
        <Fragment>
            <div
                tabIndex={0}
                aria-label="This is a Drag and Drop Region - Press Modifier and D To Pick Up Items. Use Up and Down Arrows to Move Items Higher or Lower or To a new List"
            />
            <DndProvider
                debugMode={false}
                // @ts-ignore
                options={DND_OPTIONS(props.uuidStringContainer)}
            >
                {props.children}
            </DndProvider>
        </Fragment>
    );
});

export default MyDragProvider;
