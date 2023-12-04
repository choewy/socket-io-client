import { SetterOrUpdater } from 'recoil';

import { LogsStoreValue } from '@/store';
import { SocketTransport } from './enums';

export type SocketConnectionOptions = {
  url: string;
  transport: SocketTransport;
  nsp: string;
};

export type SocketClientDispatch = {
  setLogs: SetterOrUpdater<LogsStoreValue>;
};
