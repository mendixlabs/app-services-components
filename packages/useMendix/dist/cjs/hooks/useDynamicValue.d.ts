import { DynamicValue } from "mendix";
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
export declare function useDynamicValue(inComingValue: DynamicValue<Big>): [number, DynamicState];
export declare function useDynamicValue<T>(inComingValue: DynamicValue<T>): [T, DynamicState];
