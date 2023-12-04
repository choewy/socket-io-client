import { SocketTransport, SettingStoreValue } from '@/store';

export type SocketClientOptions = {
  url: string;
  transport: SocketTransport;
  nsp: string;
};
