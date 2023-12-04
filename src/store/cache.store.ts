import { RecoilStore } from '@/common';

import { CacheStoreValue } from './types';

export class CacheStore extends RecoilStore<CacheStoreValue[]> {
  constructor() {
    super(CacheStore.name, []);
  }
}

export const cacheStore = new CacheStore();
