"use strict";
exports.__esModule = true;
exports.useDynamicValue = void 0;
var react_1 = require("react");
function useDynamicValue(inComingValue) {
    var renderCounter = (0, react_1.useRef)(0);
    var isError = false;
    /**
     * Parse, Set and  Memoize Status of `DynamicValue`
     */
    var isLoading = (0, react_1.useMemo)(function () {
        if (inComingValue.status === "available" /* ValueStatus.Available */) {
            isError = false;
            return false;
        }
        if (inComingValue.status === "loading" /* ValueStatus.Loading */) {
            isError = false;
            return true;
        }
        if (inComingValue.status === "unavailable" /* ValueStatus.Unavailable */) {
            isError = true;
            return false;
        }
        return true;
    }, [inComingValue.status]);
    /**
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    var value = (0, react_1.useMemo)(function () {
        // This is a BIG.JS
        if (inComingValue.value &&
            typeof inComingValue.value === "object" &&
            "roundHalfUp" in inComingValue.value) {
            var parse = parseInt(inComingValue.value.toFixed(0) || "0", 10);
            return parse;
        }
        return inComingValue.value;
    }, [inComingValue.value]);
    renderCounter.current = renderCounter.current + 1;
    return [value, { isLoading: isLoading, isError: isError }];
}
exports.useDynamicValue = useDynamicValue;
//# sourceMappingURL=useDynamicValue.js.map