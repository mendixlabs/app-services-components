"use strict";
exports.__esModule = true;
exports.useDynamicValue = void 0;
var react_1 = require("react");
/**
 * A Custom Hook to make working with DynamicValue in Mendix Widget a bit more consistent
 *
 * @param inComingValue - Non destructed prop coming from Mendix (`DynamicValue<>`)
 *
 *  @returns The arithmetic mean of `Value` and State Object `{ isLoading }`
 *
 *  @beta
 *
 */
function useDynamicValue(inComingValue) {
    var renderCounter = (0, react_1.useRef)(0);
    /**
     * Parse, Set and  Memoize Status of `DynamicValue`
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
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    var value = (0, react_1.useMemo)(function () {
        // This is a BIG.JS
        if (typeof inComingValue.value === "object") {
            var parse = parseInt(inComingValue.value.toFixed(0) || "0", 10);
            return parse;
        }
        return inComingValue.value;
    }, [inComingValue.value]);
    renderCounter.current = renderCounter.current + 1;
    return [value, { isLoading: isLoading }];
}
exports.useDynamicValue = useDynamicValue;
//# sourceMappingURL=useDynamicValue.js.map