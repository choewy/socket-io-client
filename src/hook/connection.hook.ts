import { useEffect } from 'react';

import { connectionStore } from '@/store';
import { connectionCacheService } from '@/service';

export class ConnectionHook {
  useCache() {
    const setConnection = connectionStore.useSetState();

    useEffect(() => {
      const connectionValue = connectionCacheService.getValueByLastest();

      if (connectionValue == null) {
        return;
      }

      setConnection(connectionValue.connection);
    }, [setConnection]);
  }
}

export const connectionHook = new ConnectionHook();
