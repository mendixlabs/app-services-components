export type UseDomChangesTimeTypes = {
  locationCallBack: () => void;
  throttleDuration: number;
  useMendixNav: boolean;
};
export type UseDomChangesReturnTypes = {
  lastUpdateTime: Date;
  createObserver: () => void;
  turnOffObserver: () => void;
};
