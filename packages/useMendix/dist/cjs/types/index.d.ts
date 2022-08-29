import type Big from "big.js";
export { Big };
export declare type AttributeValue = undefined | string | boolean | Date | Big;
export interface EditableState {
    isLoading: boolean;
    canEdit: boolean;
}
export interface EditableMethods<T> {
    setValue: (value: T) => void;
}
