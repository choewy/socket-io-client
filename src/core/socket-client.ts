import { v4 } from 'uuid';
import { Manager, Socket } from 'socket.io-client';

import { ConnectionAuthValue } from '@/store';

import { SocketClientDispatch, SocketConnectionOptions } from './types';

export class SocketClient extends Socket {
  constructor(private dispatch: SocketClientDispatch, options: SocketConnectionOptions) {
    if (options.nsp.startsWith('/') === false) {
      options.nsp = `/${options.nsp}`;
    }

    super(
      new Manager(options.url, {
        transports: [options.transport],
        autoConnect: false,
      }),
      options.nsp,
    );
  }

  private pushSubLog(event: string, ...args: any[]) {
    const response = args.length === 1 ? args.shift() ?? null : args;

    this.dispatch.setLogs((prev) => ({
      ...prev,
      sub: [...prev.sub, { key: v4(), event, response, date: new Date() }],
    }));
  }

  private pushPubLog(event: string, ...args: any[]) {
    const payload = args.length === 1 ? args.shift() ?? null : args;

    this.dispatch.setLogs((prev) => ({
      ...prev,
      pub: [...prev.pub, { key: v4(), event, payload, date: new Date() }],
    }));
  }

  initAuth(authMaps: ConnectionAuthValue[]) {
    const auth: Record<string, string> = {};

    for (const authMap of authMaps) {
      if (authMap.key === '' || authMap.value === '') {
        continue;
      }

      auth[authMap.key] = authMap.value;
    }

    this.auth = auth;
  }

  initListeners(events: string[]) {
    this.on('connect', () => this.pushSubLog('connect'));
    this.on('connect_error', (e) => this.pushSubLog('connect_error', e));
    this.on('disconnect', (reason, description) => this.pushSubLog('disconnect', { reason, description }));
    this.on('error', (e) => this.pushSubLog('error', e));
    this.on('exception', (...args: any) => this.pushSubLog('exception', ...args));

    for (const event of events) {
      if (event === '') {
        continue;
      }

      this.on(event, (...args) => this.pushSubLog(event, ...args));
    }
  }

  emit(ev: string, ...args: any[]) {
    this.pushPubLog(ev, ...args);

    return super.emit(ev, ...args);
  }
}
