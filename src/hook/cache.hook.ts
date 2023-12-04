import { v4 } from 'uuid';
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

  useLoadHandler(id: string) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      const cache = cacheService.getValueById(id);

      if (cache == null) {
        AlertEvent.dispatch({
          variant: 'warning',
          message: 'not found setting.',
        });

        CacheEvent.dispatchSettingChange();
      } else {
        setSetting(cache.setting);

        cacheService.setLoadId(cache.setting.id);

        AlertEvent.dispatch({
          variant: 'success',
          message: 'setting loaded.',
        });
      }
    }, [id, setSetting]);
  }

  useDeleteHandler(settingId: string, cacheSettingId: string) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      cacheService.deleteValueById(cacheSettingId);

      AlertEvent.dispatch({
        variant: 'success',
        message: 'setting removed.',
      });

      if (settingId === cacheSettingId) {
        setSetting({ ...settingStore.init, id: v4() });
      }
    }, [settingId, cacheSettingId, setSetting]);
  }
}

export const cacheHook = new CacheHook();
