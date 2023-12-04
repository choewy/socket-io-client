import { RecoilStore } from '@/common';

import { ConnectionStoreValue } from './connection.store';

export type ConnectionCacheStoreValue = {
  connection: ConnectionStoreValue;
  date: Date;
};

export class ConnectionCacheStore extends RecoilStore<ConnectionCacheStoreValue[]> {
  constructor() {
    super(ConnectionCacheStore.name, []);
  }
}

export const connectionCacheStore = new ConnectionCacheStore();
