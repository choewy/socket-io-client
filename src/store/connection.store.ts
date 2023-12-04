import { RecoilStore } from '@/common';
import { SocketTransport } from '@/core';

export type ConnectionAuthValue = {
  key: string;
  value: string;
};

export type ConnectionStoreValue = {
  url: string;
  nsp: string;
  transport: SocketTransport;
  auths: ConnectionAuthValue[];
  listenEventNames: string[];
};

export class ConnectionStore extends RecoilStore<ConnectionStoreValue> {
  constructor() {
    super(ConnectionStore.name, {
      url: '',
      nsp: '',
      transport: SocketTransport.Polling,
      auths: [],
      listenEventNames: [],
    });
  }
}

export const connectionStore = new ConnectionStore();
