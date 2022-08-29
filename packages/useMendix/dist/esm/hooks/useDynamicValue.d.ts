import { DynamicValue } from "mendix";
import Big from "big.js";
export declare type AttributeValue = undefined | string | boolean | Date | Big;
export interface DynamicState {
    isLoading: boolean;
}
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
export declare function useDynamicValue<T extends string | number>(inComingValue: DynamicValue<T>): [T, DynamicState];
