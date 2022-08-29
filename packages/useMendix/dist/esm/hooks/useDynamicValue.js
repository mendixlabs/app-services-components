import { useMemo, useRef } from "react";
/**
 * A Custom Hook to make working with loadings states in Mendix Widget a bit more consistent
 *
 * @param inComingValue - Non destructed prop coming from Mendix
 *
 *  @returns The arithmetic mean of `Value` and State Object `{ isLoading }`
 *
 *  @beta
 *
 */
export function useDynamicValue(inComingValue) {
    var renderCounter = useRef(0);
    /**
     * Parse, Set and  Memoize Status of `DynamicValue`
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
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    var value = useMemo(function () {
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
//# sourceMappingURL=useDynamicValue.js.map