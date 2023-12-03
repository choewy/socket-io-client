import { RecoilStore } from '@/core';

export type ConnectionAuthValue = {
  key: string;
  value: string;
};

export type ConnectionStoreValue = {
  url: string;
  auths: ConnectionAuthValue[];
  nsp: string;
  listeners: string[];
};

export class ConnectionStore extends RecoilStore<ConnectionStoreValue> {
  constructor() {
    super(ConnectionStore.name, {
      url: '',
      nsp: '',
      auths: [],
      listeners: [],
    });
  }
}

export const connectionStore = new ConnectionStore();
