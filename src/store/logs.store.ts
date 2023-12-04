import { RecoilStore } from '@/common';

export class PubLog {
  key: string;
  event: string;
  payload?: any;
  date: Date;
}

export class SubLog {
  key: string;
  event: string;
  response?: any;
  date: Date;
}

export class LogsStoreValue {
  pub: PubLog[];
  sub: SubLog[];
}

export class LogsStore extends RecoilStore<LogsStoreValue> {
  constructor() {
    super(LogsStore.name, {
      pub: [],
      sub: [],
    });
  }
}

export const logsStore = new LogsStore();
