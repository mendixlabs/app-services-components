import { useMemo, useRef } from "react";
import { DynamicValue, ValueStatus, Option } from "mendix";
import type { AttributeValue, DynamicState } from "src/utils/Types";
import Big from "big.js";

export function useDynamicValue<T extends AttributeValue>(
    inComingValue: DynamicValue<T>
): [Option<T | number>, DynamicState] {
    const renderCounter = useRef(0);

    /**
     * Parse, Set and  Memoize Status of `DynamicValue`
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
     * Parse, Set and  Memoize Value of `DynamicValue`
     */
    const value = useMemo(() => {
        // This is a BIG.JS
        if (typeof inComingValue.value === "object") {
            const parse = parseInt((inComingValue.value as Big).toFixed(0) || "0", 10);
            return parse as number;
        }
        return inComingValue.value;
    }, [inComingValue.value]);

    renderCounter.current = renderCounter.current + 1;

    return [value, { isLoading }];
}
