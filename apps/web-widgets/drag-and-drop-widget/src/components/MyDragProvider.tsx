import { createElement, FC, forwardRef, Fragment } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DND_OPTIONS } from "../utils/general";
interface MyDragInterface {
    children: any;
    uuidStringContainer: string;
    isFirefox: boolean;
}

const MyDragProvider = forwardRef<HTMLDivElement, MyDragInterface>(props => {
    return (
        <Fragment>
            <div
                tabIndex={0}
                aria-label="This is a Drag and Drop Region - Press Modifier and D To Pick Up Items. Use Up and Down Arrows to Move Items Higher or Lower or To a new List"
            />
            {props.isFirefox ? (
                <MyDragProviderForFireFox>{props.children}</MyDragProviderForFireFox>
            ) : (
                <MyDragProviderForRest {...props}>{props.children}</MyDragProviderForRest>
            )}
        </Fragment>
    );
});

export default MyDragProvider;

const MyDragProviderForFireFox: FC = ({ children }) => {
    return (
        <DndProvider
            debugMode={false}
            // @ts-ignore
            backend={HTML5Backend}
        >
            {children}
        </DndProvider>
    );
};

export const MyDragProviderForRest: FC<Omit<MyDragInterface, "isFirefox">> = ({ children, uuidStringContainer }) => {
    return (
        <DndProvider
            debugMode={false}
            // @ts-ignore
            options={DND_OPTIONS(uuidStringContainer)}
        >
            {children}
        </DndProvider>
    );
};
