export type UseDomChangesTimeTypes = {
  locationCallBack: () => void;
  throttleDuration: number;
  useMendixNav: boolean;
};
export type UseDomChangesReturnTypes = {
  lastUpdateTime: Date;
  // createObserver: () => void;
  turnOffObserver: () => void;
};
export enum TypeEnum {
  Id,
  Key,
}

export type LastWindowIdType = {
  type: TypeEnum;
  state: Window;
};
