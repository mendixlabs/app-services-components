"use strict";
exports.__esModule = true;
exports.useEditableValue = void 0;
var react_1 = require("react");
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
function useEditableValue(inComingValue) {
    /**
     * Parse, Set and  Memoize Status of `EditableValue`
     */
    var isLoading = (0, react_1.useMemo)(function () {
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
    var canEdit = (0, react_1.useMemo)(function () {
        return !inComingValue.readOnly;
    }, [inComingValue.readOnly]);
    /**
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    var value = (0, react_1.useMemo)(function () {
        return inComingValue.value;
    }, [inComingValue.value]);
    return [value, { isLoading: isLoading, canEdit: canEdit }, { setValue: inComingValue.setValue }];
}
exports.useEditableValue = useEditableValue;
//# sourceMappingURL=useEditableValue.js.map