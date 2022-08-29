import { useMemo } from "react";
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
export function useEditableValue(inComingValue) {
    /**
     * Parse, Set and  Memoize Status of `EditableValue`
     */
    var isLoading = useMemo(function () {
        if (inComingValue.status === "available" /* ValueStatus.Available */) {
            return false;
        }
        if (inComingValue.status === "loading" /* ValueStatus.Loading */) {
            return true;
        }
        return true;
    }, [inComingValue.status]);
    /**
     * Parse, Set and  Memoize Status of `EditableValue`
     */
    var canEdit = useMemo(function () {
        return !inComingValue.readOnly;
    }, [inComingValue.readOnly]);
    /**
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    var value = useMemo(function () {
        return inComingValue.value;
    }, [inComingValue.value]);
    return [value, { isLoading: isLoading, canEdit: canEdit }, { setValue: inComingValue.setValue }];
}
//# sourceMappingURL=useEditableValue.js.map