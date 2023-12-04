import { RecoilStore } from '@/common';

import { SocketEventLogStoreValue } from './types';

export class SocketLogStore extends RecoilStore<SocketEventLogStoreValue> {
  constructor() {
    super(SocketLogStore.name, {
      pub: [],
      sub: [],
    });
  }
}

export const socketLogStore = new SocketLogStore();
