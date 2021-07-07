/* tslint:disable */
import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import {
  UseDomChangesReturnTypes,
  UseDomChangesTimeTypes,
  TypeEnum,
  LastWindowIdType,
} from './types';

export function useDomLocation({
  locationCallBack,
  throttleDuration,
  useMendixNav,
}: UseDomChangesTimeTypes): UseDomChangesReturnTypes {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  let lastScrollTopRef = useRef<MutationObserver>();
  let lastWindowId = useRef<LastWindowIdType>();
  let lastMendixHashId = useRef<string>();

  const turnOffObserver = () => {
    if (lastScrollTopRef.current) {
      lastScrollTopRef.current.disconnect();
    }
  };

  const onMutation = (): void => {
    console.log('Mute Me Buddy 🧎🏽‍♂️🧎🏽‍♂️🧎🏽‍♂️🧎🏽‍♂️');

    setLastUpdateTime(new Date());
    if (useMendixNav) {
      const mxWindow = window.mx.ui.getContentForm();
      if (mxWindow) {
        const mxHash = window.mx.ui.getContentForm().hash;
        if (mxHash !== lastMendixHashId.current) {
          lastMendixHashId.current = mxHash;
          return locationCallBack();
        }
      }
    }
    if (!useMendixNav) {
      if (!lastWindowId.current) {
        if (!window.history.state) return;
        if (window.history.state.id) {
          lastWindowId.current = {
            type: TypeEnum.Id,
            state: window.history.state.id,
          };
          return locationCallBack();
        }
        if (window.history.state.key) {
          lastWindowId.current = {
            type: TypeEnum.Key,
            state: window.history.state.key,
          };
          return locationCallBack();
        }
      }
      if (lastWindowId.current) {
        if (
          lastWindowId.current.type === TypeEnum.Id &&
          lastWindowId.current.state !== window.history.state.id
        ) {
          lastWindowId.current = {
            type: TypeEnum.Id,
            state: window.history.state.id,
          };
          return locationCallBack();
        }
        if (
          lastWindowId.current.type === TypeEnum.Key &&
          lastWindowId.current.state !== window.history.state.key
        ) {
          lastWindowId.current = {
            type: TypeEnum.Key,
            state: window.history.state.key,
          };
          return locationCallBack();
        }
      }
    }
  };
  const createObserver = () => {
    const wrappedOnMutation = throttle(onMutation, throttleDuration, {
      leading: false,
    });
    const observer = new MutationObserver(wrappedOnMutation);
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
    lastScrollTopRef.current = observer;
    window.onpopstate = function () {
      onMutation();
    };
  };

  useEffect(() => {
    createObserver();
  }, [throttleDuration]);

  return {
    lastUpdateTime,
    turnOffObserver,
  };
}
