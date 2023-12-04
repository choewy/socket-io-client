import { useCallback } from 'react';

import { SettingStoreValue } from '@/store';
import { socketService, cacheService } from '@/service';

export class SocketHook {
  useConnectHandler(setting: SettingStoreValue) {
    return useCallback(() => {
      if (setting.url === '') {
        return;
      }

      socketService.createClient(setting);
      cacheService.setValue(setting);
    }, [setting]);
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
