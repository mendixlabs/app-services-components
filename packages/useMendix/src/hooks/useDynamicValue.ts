import { useMemo, useRef } from "react";
import { DynamicValue, ValueStatus } from "mendix";
import { Big } from "../types";

export interface DynamicState {
  isLoading: boolean;
  isError: boolean;
}

/**
 * A Custom Hook to make working with DynamicValue in Mendix Widget a bit more consistent
 * Can be used by passing in return Type or Can infer it from Passed Value
 *
 *  @param inComingValue - Non destructed prop coming from Mendix (`DynamicValue<>`)
 *
 *  @returns The arithmetic mean of `Value` and State Object `{ isLoading }`
 *
 *  @beta
 *
 */

export function useDynamicValue(
  inComingValue: DynamicValue<Big>
): [number, DynamicState];
export function useDynamicValue<T>(
  inComingValue: DynamicValue<T>
): [T, DynamicState];
export function useDynamicValue<T>(inComingValue: DynamicValue<T>) {
  const renderCounter = useRef(0);
  let isError = false;

  /**
   * Parse, Set and  Memoize Status of `DynamicValue`
   */
  const isLoading = useMemo(() => {
    if (inComingValue.status === ValueStatus.Available) {
      isError = false;
      return false;
    }
    if (inComingValue.status === ValueStatus.Loading) {
      isError = false;
      return true;
    }
    if (inComingValue.status === ValueStatus.Unavailable) {
      isError = true;
      return false;
    }
    return true;
  }, [inComingValue.status]);

  /**
   * Parse, Set and  Memoize Value of `DynamicValue`
   */
  const value = useMemo(() => {
    // This is a BIG.JS
    if (
      inComingValue.value &&
      typeof inComingValue.value === "object" &&
      "roundHalfUp" in inComingValue.value
    ) {
      const parse = parseInt(
        (inComingValue.value as Big).toFixed(0) || "0",
        10
      );
      return parse;
    }

    return inComingValue.value;
  }, [inComingValue.value]);

  renderCounter.current = renderCounter.current + 1;

  return [value, { isLoading, isError }];
}
