import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import { UseDomChangesReturnTypes, UseDomChangesTimeTypes } from './types';

export function useDomLocation({
  locationCallBack,
  throttleDuration,
  useMendixNav,
}: UseDomChangesTimeTypes): UseDomChangesReturnTypes {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  let lastScrollTopRef = useRef<MutationObserver>();
  let lastWindowId = useRef<any>();
  let lastMendixHashId = useRef<string>();

  const turnOffObserver = () => {
    if (lastScrollTopRef.current) {
      lastScrollTopRef.current.disconnect();
    }
  };

  const onMutation = () => {
    setLastUpdateTime(new Date());
    if (useMendixNav) {
      const mxWindow = window.mx.ui.getContentForm();
      if (mxWindow) {
        const mxHash = window.mx.ui.getContentForm().hash;
        if (mxHash !== lastMendixHashId.current) {
          lastMendixHashId.current = mxHash;
          locationCallBack();
        }
      }
    }
    if (!useMendixNav) {
      if (!lastWindowId.current) {
        if (window.history.state.id) {
          return (lastWindowId.current = {
            type: 'id',
            state: window.history.state.id,
          });
        }
        if (window.history.state.key) {
          return (lastWindowId.current = {
            type: 'key',
            state: window.history.state.key,
          });
        }
      }
      if (lastWindowId.current) {
        if (
          lastWindowId.current.type === 'id' &&
          lastWindowId.current.state !== window.history.state.id
        ) {
          lastWindowId.current = {
            type: 'id',
            state: window.history.state.id,
          };
          return locationCallBack();
        }
        if (
          lastWindowId.current.type === 'key' &&
          lastWindowId.current.state !== window.history.state.key
        ) {
          lastWindowId.current = {
            type: 'key',
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
    window.onpopstate = function() {
      onMutation();
    };
  };
  useEffect(() => {
    createObserver();
  }, []);

  return {
    lastUpdateTime,
    createObserver,
    turnOffObserver,
  };
}
