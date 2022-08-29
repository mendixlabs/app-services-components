import { useMemo, useRef } from "react";
import { DynamicValue, ValueStatus } from "mendix";
import { Big } from "../types";

export interface DynamicState {
  isLoading: boolean;
}

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

export function useDynamicValue<T extends string | number | Big | boolean>(
  inComingValue: DynamicValue<T>
): [T, DynamicState] {
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
      const parse = parseInt(
        (inComingValue.value as Big).toFixed(0) || "0",
        10
      );
      return parse as T;
    }

    return inComingValue.value as T;
  }, [inComingValue.value]);

  renderCounter.current = renderCounter.current + 1;

  return [value, { isLoading }];
}
