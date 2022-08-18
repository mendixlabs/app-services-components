import { EditableValue, ValueStatus, Option } from "mendix";
import { useMemo, useRef } from "react";
import type { AttributeValue, EditableMethods, EditableState } from "src/utils/Types";

export function useEditableValue<T extends AttributeValue>(
    inComingValue: EditableValue<Option<T>>
): [Option<T>, EditableState, EditableMethods<T>] {
    const renderCounter = useRef(0);

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

    renderCounter.current = renderCounter.current + 1;

    return [value, { isLoading, canEdit }, { setValue: inComingValue.setValue }];
}
