import { CacheEvent } from '@/event';
import { CacheStoreValue } from '@/store';

export class CacheService {
  private readonly VALUE_KEY = 'socket.io-testing-cache';
  private readonly LOAD_KEY = 'socket.io-testing-load-id';

  getLoadId() {
    return localStorage.getItem(this.LOAD_KEY) ?? null;
  }

  setLoadId(id: string) {
    return localStorage.setItem(this.LOAD_KEY, id);
  }

  getValues(): CacheStoreValue[] {
    return JSON.parse(localStorage.getItem(this.VALUE_KEY) ?? '[]');
  }

  getValueById(id: string): CacheStoreValue | null {
    return this.getValues().find((value) => value.setting.id === id) ?? null;
  }

  getValueByIndex(index: number): CacheStoreValue | null {
    return this.getValues()[index] ?? null;
  }

  getValueByLastest(): CacheStoreValue | null {
    const values = this.getValues();

    let value: CacheStoreValue | null = values.find((v) => v.setting.id === this.getLoadId());

    if (value == null) {
      value = values.sort((x, y) => new Date(x.date).getTime() - new Date(y.date).getTime()).pop();
    }

    if (value) {
      this.setLoadId(value.setting.id);
    }

    return value ?? null;
  }

  setValue(setting: CacheStoreValue['setting']): void {
    const values = this.getValues();
    const valueIndex = values.findIndex((value) => value.setting.id === setting.id);

    if (valueIndex < 0) {
      values.push({ setting, date: new Date() });
    } else {
      values[valueIndex].setting = setting;
      values[valueIndex].date = new Date();
    }

    localStorage.setItem(this.VALUE_KEY, JSON.stringify(values));

    CacheEvent.dispatchSettingChange();
  }

  deleteValues(): void {
    return localStorage.removeItem(this.VALUE_KEY);
  }

  deleteValueById(id: string): void {
    const values = this.getValues().filter((value) => value.setting.id !== id);

    localStorage.setItem(this.VALUE_KEY, JSON.stringify(values));

    CacheEvent.dispatchSettingChange();
  }
}

export const cacheService = new CacheService();
