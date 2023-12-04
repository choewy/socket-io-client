import { SetterOrUpdater } from 'recoil';

import { ConnectionStoreValue, LogsStoreValue } from '@/store';
import { SocketTransport } from './enums';

export type SocketConnectionOptions = {
  url: string;
  transport: SocketTransport;
  nsp: string;
};

export type SocketClientDispatch = {
  setLogs: SetterOrUpdater<LogsStoreValue>;
};

export type LocalStorageConnectionValue = {
  connection: ConnectionStoreValue;
  date: Date;
};
