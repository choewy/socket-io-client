import { useCallback, useEffect } from 'react';

import { connectionCacheStore, connectionStore } from '@/store';
import { ConnectionCacheEvent, connectionCacheService } from '@/service';
import { AlertEvent } from './alert.hook';

export class ConnectionCacheHook {
  useListener() {
    const setConnectionCache = connectionCacheStore.useSetState();

    const onConnectionCache = useCallback(
      (_?: Event) => {
        setConnectionCache(connectionCacheService.getValues());
      },
      [setConnectionCache],
    );

    useEffect(() => {
      onConnectionCache();

      window.addEventListener(ConnectionCacheEvent.eventName, onConnectionCache);

      return () => {
        window.removeEventListener(ConnectionCacheEvent.eventName, onConnectionCache);
      };
    }, [setConnectionCache]);
  }

  useUseHandler(index: number) {
    const setConnection = connectionStore.useSetState();

    return useCallback(() => {
      setConnection(connectionCacheService.getValueByIndex(index).connection);

      AlertEvent.dispatch({
        variant: 'success',
        message: 'connection setting changed.',
      });
    }, [index, setConnection]);
  }

  useDeleteHandler(index: number) {
    return useCallback(() => {
      connectionCacheService.deleteValueByIndex(index);

      AlertEvent.dispatch({
        variant: 'success',
        message: 'connection setting removed.',
      });
    }, [index]);
  }
}

export const connectionCacheHook = new ConnectionCacheHook();
