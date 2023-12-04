import { useCallback, useEffect } from 'react';

import { SocketPubLog, SocketSubLog, socketLogStore } from '@/store';
import { SocketEvent } from '@/event';

export class SocketLogHook {
  useListener() {
    const setSocketLog = socketLogStore.useSetState();

    const onInitEventHandler = useCallback(
      (_: Event) => {
        setSocketLog({ pub: [], sub: [] });
      },
      [setSocketLog],
    );

    const onPubEventHandler = useCallback(
      (e: Event) => {
        setSocketLog((prev) => ({
          ...prev,
          pub: [...prev.pub, (e as CustomEvent<SocketPubLog>).detail],
        }));
      },
      [setSocketLog],
    );

    const onSubEventHandler = useCallback(
      (e: Event) => {
        setSocketLog((prev) => ({
          ...prev,
          sub: [...prev.sub, (e as CustomEvent<SocketSubLog>).detail],
        }));
      },
      [setSocketLog],
    );

    useEffect(() => {
      window.addEventListener(SocketEvent.initEventName, onInitEventHandler);
      window.addEventListener(SocketEvent.pubEventName, onPubEventHandler);
      window.addEventListener(SocketEvent.subEventName, onSubEventHandler);

      return () => {
        window.removeEventListener(SocketEvent.initEventName, onInitEventHandler);
        window.removeEventListener(SocketEvent.pubEventName, onPubEventHandler);
        window.removeEventListener(SocketEvent.subEventName, onSubEventHandler);
      };
    }, [onInitEventHandler, onPubEventHandler, onSubEventHandler]);
  }
}

export const socketLogHook = new SocketLogHook();
