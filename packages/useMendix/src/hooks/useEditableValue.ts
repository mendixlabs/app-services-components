import { EditableValue, ValueStatus } from "mendix";
import { useMemo } from "react";
import { AttributeValue, EditableMethods, EditableState } from "../types";

type Option<T> = T | undefined;

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

export function useEditableValue<T extends AttributeValue>(
  inComingValue: EditableValue<Option<T>>
): [Option<T>, EditableState, EditableMethods<T>] {
  /**
   * Parse, Set and  Memoize Status of `EditableValue`
   */
  const isLoading = useMemo(() => {
    if (inComingValue.status === ValueStatus.Available) {
      return false;
    }
    if (inComingValue.status === ValueStatus.Loading) {
      return true;
    }
    return true;
  }, [inComingValue.status]);

  /**
   * Parse, Set and  Memoize Status of `EditableValue`
   */
  const canEdit = useMemo(() => {
    return !inComingValue.readOnly;
  }, [inComingValue.readOnly]);

  /**
   * Parse, Set and  Memoize Value of `DynamicValue`
   */
  const value = useMemo(() => {
    return inComingValue.value;
  }, [inComingValue.value]);

  return [value, { isLoading, canEdit }, { setValue: inComingValue.setValue }];
}
