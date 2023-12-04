import { RecoilStore } from '@/common';

import { AlertStoreValue } from './types';

export class AlertStore extends RecoilStore<AlertStoreValue[]> {
  constructor() {
    super(AlertStore.name, []);
  }
}

export const alertStore = new AlertStore();
