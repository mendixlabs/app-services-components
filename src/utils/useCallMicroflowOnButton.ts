import { useState, useEffect } from "react";
import { isKeyboardDragTrigger } from "react-dnd-accessible-backend";

/**
 * Custom Hook To Detect if User Activates A11y
 *  react-dnd-accessible-backend swallows enter and esc so thats why we use key up to detect that
 */

export const useCallMicroflowOnButton = (initialState: boolean): boolean => {
    const [isActive, setIsActive] = useState(initialState);
    useEffect(() => {
        const keydownFunc = (event: KeyboardEvent) => {
            if (isKeyboardDragTrigger(event) && !isActive) {
                setIsActive(true);
            }
        };
        const keyUp = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === "Escape") {
                setIsActive(false);
            }
        };

        if (isActive) {
            document.addEventListener("keydown", keydownFunc);
            document.addEventListener("keyup", keyUp);
        }

        return () => {
            document.removeEventListener("keydown", keydownFunc);
            document.removeEventListener("keyup", keyUp);
        };
    }, [isActive]);

    return isActive;
};
