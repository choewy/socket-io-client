import { LocalStorageConnectionValue } from './types';

export class LocalStorageService {
  private readonly KEY = 'socket-testing-client-connection';

  getValues(): LocalStorageConnectionValue[] {
    return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
  }

  getValueByIndex(index: number): LocalStorageConnectionValue | null {
    return this.getValues()[index] ?? null;
  }

  getValueByLastest(): LocalStorageConnectionValue | null {
    return this.getValues().pop() ?? null;
  }

  setValue(value: LocalStorageConnectionValue): void {
    const values = this.getValues().filter((v) => JSON.stringify(v?.connection) !== JSON.stringify(value.connection));

    values.push(value);

    localStorage.setItem(this.KEY, JSON.stringify(values));
  }

  deleteValues(): void {
    return localStorage.removeItem(this.KEY);
  }

  deleteValueByIndex(index: number): void {
    return localStorage.setItem(this.KEY, JSON.stringify(this.getValues().filter((_, i) => i !== index)));
  }
}

export const localStorageService = new LocalStorageService();