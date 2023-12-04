import { ConnectionCache } from './types';

import { ConnectionCacheEvent } from './connection-cache.event';

export class ConnectionCacheService {
  private readonly KEY = 'connection-cache';

  getValues(): ConnectionCache[] {
    return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
  }

  getValueByIndex(index: number): ConnectionCache | null {
    return this.getValues()[index] ?? null;
  }

  getValueByLastest(): ConnectionCache | null {
    return this.getValues().pop() ?? null;
  }

  setValue(value: ConnectionCache): void {
    const values = this.getValues().filter((v) => JSON.stringify(v?.connection) !== JSON.stringify(value.connection));

    values.push(value);

    localStorage.setItem(this.KEY, JSON.stringify(values));

    ConnectionCacheEvent.dispatch();
  }

  deleteValues(): void {
    return localStorage.removeItem(this.KEY);
  }

  deleteValueByIndex(index: number): void {
    const values = this.getValues().filter((_, i) => i !== index);

    localStorage.setItem(this.KEY, JSON.stringify(values));

    ConnectionCacheEvent.dispatch();
  }
}

export const connectionCacheService = new ConnectionCacheService();
