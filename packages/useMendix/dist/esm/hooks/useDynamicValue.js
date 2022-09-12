import { useMemo, useRef } from "react";
export function useDynamicValue(inComingValue) {
    var renderCounter = useRef(0);
    var isError = false;
    /**
     * Parse, Set and  Memoize Status of `DynamicValue`
     */
    var isLoading = useMemo(function () {
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
    var value = useMemo(function () {
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
//# sourceMappingURL=useDynamicValue.js.map