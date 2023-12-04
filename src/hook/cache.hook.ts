import { useCallback, useEffect } from 'react';

import { settingStore, cacheStore } from '@/store';
import { cacheService } from '@/service';
import { AlertEvent, CacheEvent } from '@/event';

export class CacheHook {
  useListener() {
    const setCache = cacheStore.useSetState();

    const onCacheChange = useCallback(
      (_?: Event) => {
        setCache(cacheService.getValues());
      },
      [setCache],
    );

    useEffect(() => {
      onCacheChange();

      window.addEventListener(CacheEvent.settingChangeEventName, onCacheChange);

      return () => {
        window.removeEventListener(CacheEvent.settingChangeEventName, onCacheChange);
      };
    }, [setCache]);
  }

  useUseHandler(index: number) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting(cacheService.getValueByIndex(index).setting);

      AlertEvent.dispatch({
        variant: 'success',
        message: 'setting changed.',
      });
    }, [index, setSetting]);
  }

  useDeleteHandler(index: number) {
    return useCallback(() => {
      cacheService.deleteValueByIndex(index);

      AlertEvent.dispatch({
        variant: 'success',
        message: 'setting removed.',
      });
    }, [index]);
  }
}

export const cacheHook = new CacheHook();
