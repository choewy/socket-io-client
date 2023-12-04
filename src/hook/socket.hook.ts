import { useCallback } from 'react';

import { SettingStoreValue, settingStore } from '@/store';
import { socketService, cacheService } from '@/service';

export class SocketHook {
  useConnectHandler(setting: SettingStoreValue) {
    const setSetting = settingStore.useSetState();

    return useCallback(() => {
      if (setting.url === '') {
        return;
      }

      const s = { ...setting };

      s.authValues = setting.authValues.filter((authValues) => authValues.key || authValues.value);
      s.eventNames = setting.eventNames.filter((eventName) => eventName);

      setSetting(s);

      socketService.createClient(s);
      cacheService.setValue(s);
    }, [setting, setSetting]);
  }

  useSendMessageHandler(event: string, ...args: any[]) {
    return useCallback(() => {
      if (event === '') {
        return;
      }

      socketService.sendMessage(event, ...args);
    }, [event, ...args]);
  }
}

export const socketHook = new SocketHook();
