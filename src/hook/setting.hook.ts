import { useEffect } from 'react';

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
}

export const settingHook = new SettingHook();
