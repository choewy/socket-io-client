import { RecoilStore } from '@/common';

export type SocketPubLog = {
  key: string;
  event: string;
  payload: any;
  date: Date;
};

export type SocketSubLog = {
  key: string;
  event: string;
  response: any;
  date: Date;
};

export type SocketEventLogStoreValue = {
  pub: SocketPubLog[];
  sub: SocketSubLog[];
};

export class SocketLogStore extends RecoilStore<SocketEventLogStoreValue> {
  constructor() {
    super(SocketLogStore.name, {
      pub: [],
      sub: [],
    });
  }
}

export const socketLogStore = new SocketLogStore();
