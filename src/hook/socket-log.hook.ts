import { useCallback, useEffect } from 'react';

import { SocketPubLog, SocketSubLog, socketLogStore } from '@/store';
import { SocketLogEvent } from '@/event';

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
      window.addEventListener(SocketLogEvent.initEventName, onInitEventHandler);
      window.addEventListener(SocketLogEvent.pubEventName, onPubEventHandler);
      window.addEventListener(SocketLogEvent.subEventName, onSubEventHandler);

      return () => {
        window.removeEventListener(SocketLogEvent.initEventName, onInitEventHandler);
        window.removeEventListener(SocketLogEvent.pubEventName, onPubEventHandler);
        window.removeEventListener(SocketLogEvent.subEventName, onSubEventHandler);
      };
    }, [onInitEventHandler, onPubEventHandler, onSubEventHandler]);
  }
}

export const socketLogHook = new SocketLogHook();
