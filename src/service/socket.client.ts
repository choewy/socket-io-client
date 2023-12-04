import { Manager, Socket } from 'socket.io-client';

import { SettingAuthValue } from '@/store';
import { AlertEvent, SocketEvent } from '@/event';

import { SocketClientOptions } from './types';

export class SocketClient extends Socket {
  ignoreDipatchEvent: boolean = false;

  constructor(options: SocketClientOptions) {
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

  private onEventHandler(event: string) {
    return (...args: any[]) => {
      if (this.ignoreDipatchEvent) {
        return;
      }

      SocketEvent.dispatchSub(event, ...args);
      AlertEvent.dispatch({
        variant: 'info',
        message: `${event} received with ${JSON.stringify(args)}`,
      });
    };
  }

  disconnect(): this {
    this.ignoreDipatchEvent = true;

    return super.disconnect();
  }

  initAuth(authMaps: SettingAuthValue[]) {
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
    this.on('connect', this.onEventHandler('connect'));
    this.on('connect_error', this.onEventHandler('connect_error'));
    this.on('disconnect', this.onEventHandler('disconnect'));
    this.on('error', this.onEventHandler('error'));
    this.on('exception', this.onEventHandler('exception'));

    for (const event of events) {
      if (event === '') {
        continue;
      }

      this.on(event, this.onEventHandler(event));
    }
  }

  emit(event: string, ...args: any[]) {
    if (this.ignoreDipatchEvent === false) {
      SocketEvent.dispatchPub(event, ...args);
      AlertEvent.dispatch({
        variant: 'success',
        message: `${event} sended with ${args}`,
      });
    }

    return super.emit(event, ...args);
  }
}
