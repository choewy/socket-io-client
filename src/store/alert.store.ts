import { RecoilStore } from '@/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export type AlertStoreValue = {
  variant: AlertVariant;
  message: string;
};

export class AlertStore extends RecoilStore<AlertStoreValue[]> {
  constructor() {
    super(AlertStore.name, []);
  }
}

export const alertStore = new AlertStore();
