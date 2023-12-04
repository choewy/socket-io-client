import { RecoilStore } from '@/common';

import { SocketTransport } from './enums';
import { SettingStoreValue } from './types';

export class SettingStore extends RecoilStore<SettingStoreValue> {
  constructor() {
    super(SettingStore.name, {
      url: '',
      nsp: '',
      transport: SocketTransport.Polling,
      authValues: [],
      eventNames: [],
    });
  }
}

export const settingStore = new SettingStore();
