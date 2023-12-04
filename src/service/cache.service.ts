import { CacheEvent } from '@/event';
import { CacheStoreValue } from '@/store';

export class CacheService {
  private readonly KEY = 'socket.io-testing-cache';

  getValues(): CacheStoreValue[] {
    return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
  }

  getValueByIndex(index: number): CacheStoreValue | null {
    return this.getValues()[index] ?? null;
  }

  getValueByLastest(): CacheStoreValue | null {
    return this.getValues().pop() ?? null;
  }

  setValue(value: CacheStoreValue): void {
    const values = this.getValues().filter((v) => JSON.stringify(v?.setting) !== JSON.stringify(value.setting));

    values.push(value);

    localStorage.setItem(this.KEY, JSON.stringify(values));

    CacheEvent.dispatchSettingChange();
  }

  deleteValues(): void {
    return localStorage.removeItem(this.KEY);
  }

  deleteValueByIndex(index: number): void {
    const values = this.getValues().filter((_, i) => i !== index);

    localStorage.setItem(this.KEY, JSON.stringify(values));

    CacheEvent.dispatchSettingChange();
  }
}

export const cacheService = new CacheService();
