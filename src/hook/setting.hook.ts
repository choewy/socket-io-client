import { v4 } from 'uuid';

import { useCallback, useEffect } from 'react';

import { settingStore } from '@/store';
import { cacheService } from '@/service';

export class SettingHook {
  useCache() {
    const setSetting = settingStore.useSetState();

    useEffect(() => {
      const cache = cacheService.getValueByLastest();

      if (cache == null) {
        return;
      }

      if (
        typeof cache === 'object' &&
        (cache.setting == null ||
          cache.setting.id == null ||
          cache.setting.url == null ||
          cache.setting.transport == null ||
          cache.setting.nsp == null ||
          cache.setting.authValues == null ||
          cache.setting.eventNames == null)
      ) {
        return cacheService.deleteValues();
      }

      setSetting(cache.setting);
    }, [setSetting]);
  }

  useResetHandler() {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      setSetting({
        ...settingStore.init,
        id: v4(),
      });
    }, [setSetting]);
  }
}

export const settingHook = new SettingHook();
