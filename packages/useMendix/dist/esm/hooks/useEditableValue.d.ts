import { EditableValue } from "mendix";
import { AttributeValue, EditableMethods, EditableState } from "../types";
declare type Option<T> = T | undefined;
/**
 * A Custom Hook to make working with EditableValue in Mendix Widget a bit more consistent
 *
 * @param inComingValue - Non destructed prop coming from Mendix (`EditableValue<>`)
 *
 *  @returns`Value` and State Object `{ isLoading,canEdit }` and Edit Object `{setValue}`
 *
 *  @beta
 *
 */
export declare function useEditableValue<T extends AttributeValue>(inComingValue: EditableValue<Option<T>>): [Option<T>, EditableState, EditableMethods<T>];
export {};
