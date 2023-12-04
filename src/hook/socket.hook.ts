import { useCallback } from 'react';

import { ConnectionStoreValue } from '@/store';
import { connectionCacheService, socketService } from '@/service';

export class SocketHook {
  useConnectHandler(connection: ConnectionStoreValue) {
    return useCallback(() => {
      if (connection.url === '') {
        return;
      }

      socketService.createClient(connection);
      connectionCacheService.setValue({ connection, date: new Date() });
    }, [connection]);
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
