import type Big from "big.js";

export { Big };

export type AttributeValue = undefined | string | boolean | Date | Big; // I no want to do this

export interface EditableState {
  isLoading: boolean;
  canEdit: boolean;
}
export interface EditableMethods<T> {
  setValue: (value: T) => void;
}
