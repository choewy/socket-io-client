import { SocketTransport } from './enums';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export type AlertStoreValue = {
  variant: AlertVariant;
  message: string;
};

export type SettingAuthValue = {
  key: string;
  value: string;
};

export type SettingStoreValue = {
  url: string;
  nsp: string;
  transport: SocketTransport;
  authValues: SettingAuthValue[];
  eventNames: string[];
};

export type CacheStoreValue = {
  setting: SettingStoreValue;
  date: Date;
};

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
