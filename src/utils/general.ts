import KeyboardBackend, { isKeyboardDragTrigger } from "react-dnd-accessible-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { createTransition } from "react-dnd-multi-backend";

import { Enum_DND_ClassNames } from "../userTypes";

export const getClassNames = (prefix: string): Enum_DND_ClassNames => {
    return {
        dnd_container: `${prefix + "_dnd_container dnd_container"}`,
        dnd_container_inside: `${prefix + "_dnd_container_inside dnd_container_inside"}`,
        dnd_drag_preview_container: `${prefix + "_dnd_drag_preview_container dnd_drag_preview_container"}`,
        dnd_drag_preview_item: `${prefix + "_dnd_drag_preview_item dnd_drag_preview_item"}`,
        dnd_draggable_item: `${prefix + "_dnd_draggable_item dnd_draggable_item"}`,
        dnd_draggable_dragging: `${prefix + "_dnd_draggable_dragging dnd_draggable_dragging"}`,
        dnd_draggable_not_dragging: `${prefix + "_dnd_draggable_not_dragging dnd_draggable_not_dragging"}`,
        dnd_draggable_container_dragging: `${
            prefix + "_dnd_draggable_container_dragging dnd_draggable_container_dragging"
        }`,
        dnd_draggable_container_not_dragging: `${
            prefix + "_dnd_draggable_container_not_dragging dnd_draggable_container_not_dragging"
        }`,
        dnd_draggable_not_new: `${prefix + "_dnd_draggable_not_new dnd_draggable_not_new"}`,
        dnd_draggable_new: `${prefix + "_dnd_draggable_new dnd_draggable_new"}`,
        dnd_draggable_not_over: `${prefix + "_dnd_draggable_not_over dnd_draggable_not_over"}`,
        dnd_draggable_over: `${prefix + "_dnd_draggable_over dnd_draggable_over"}`,
        dnd_draggable_container_droppable: `${
            prefix + "_dnd_draggable_container_droppable dnd_draggable_container_droppable"
        }`,
        dnd_draggable_hover: `${prefix + "_dnd_draggable_hover dnd_draggable_hover"}`,
        dnd_draggable_not_hover: `${prefix + "_dnd_draggable_not_hover dnd_draggable_not_hover"}`,
        dnd_draggable_with_spacer: `${prefix + "_dnd_draggable_with_spacer dnd_draggable_with_spacer"}`,
        dnd_draggable_without_spacer: `${prefix + "_dnd_draggable_without_spacer dnd_draggable_without_spacer"}`,
        dnd_spacer: `${prefix + "_dnd_spacer dnd_spacer"}`
    };
};

export const KeyboardTransition = createTransition("keydown", event => {
    console.log("event", event, isKeyboardDragTrigger(event as KeyboardEvent));
    if (!isKeyboardDragTrigger(event as KeyboardEvent)) return false;
    event.preventDefault();
    return true;
});

export const MouseTransition = createTransition("mousedown", event => {
    if (event.type.indexOf("touch") !== -1 || event.type.indexOf("mouse") === -1) return false;
    return true;
});

export const DND_OPTIONS = (id: string) => {
    return {
        backends: [
            {
                preview: false,
                handleKey: "html5",
                backend: TouchBackend,
                options: { enableTouchEvents: false, enableMouseEvents: true },
                transition: MouseTransition
            },
            {
                id: `keyboard_${id}`,
                backend: KeyboardBackend,
                context: { window, document },
                options: {
                    announcerClassName: "announcer"
                },
                preview: false,
                transition: KeyboardTransition
            }
        ]
    };
};

// id: string;
// backend: BackendFactory;
// transition?: Transition;
// preview?: boolean;
// skipDispatchOnTransition?: boolean;
// options?: unknown;
