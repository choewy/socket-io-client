import { SocketTransport, ConnectionStoreValue } from '@/store';

export type SocketClientOptions = {
  url: string;
  transport: SocketTransport;
  nsp: string;
};

export type ConnectionCache = {
  connection: ConnectionStoreValue;
  date: Date;
};
