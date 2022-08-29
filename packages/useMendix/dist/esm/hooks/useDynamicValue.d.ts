import { DynamicValue } from "mendix";
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
export declare function useDynamicValue<T extends string | number | Big | boolean>(inComingValue: DynamicValue<T>): [T, DynamicState];
