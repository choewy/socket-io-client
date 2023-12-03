import { RecoilStore } from '@/core';

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

export class LogsStore extends RecoilStore<{
  pub: PubLog[];
  sub: SubLog[];
}> {
  constructor() {
    super(LogsStore.name, {
      pub: [],
      sub: [],
    });
  }
}

export const logsStore = new LogsStore();
