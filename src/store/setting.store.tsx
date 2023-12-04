import { RecoilStore } from '@/common';

import { SocketTransport } from './enums';
import { SettingStoreValue } from './types';
import { v4 } from 'uuid';

export class SettingStore extends RecoilStore<SettingStoreValue> {
  constructor() {
    super(SettingStore.name, {
      id: v4(),
      url: '',
      nsp: '',
      transport: SocketTransport.Polling,
      authValues: [],
      eventNames: [],
    });
  }
}

export const settingStore = new SettingStore();
