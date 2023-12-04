import { Manager, Socket } from 'socket.io-client';

import { AlertVariant, SettingAuthValue } from '@/store';
import { AlertEvent, SocketLogEvent } from '@/event';

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

      SocketLogEvent.dispatchSub(event, ...args);

      const response = JSON.stringify(args, null, 2);

      let variant: AlertVariant = 'info';
      let message = `received "${event}" with ${response}`;

      if (['connect'].includes(event)) {
        variant = 'success';
        message = 'connected';
      }

      if (['exception', 'disconnect'].includes(event)) {
        variant = 'warning';
        message = `${event} with ${response}`;
      }

      if (['error', 'connect_error'].includes(event)) {
        variant = 'error';
        message = `${event} with ${response}`;
      }

      AlertEvent.dispatch({ variant, message });
    };
  }

  disconnect(): this {
    this.ignoreDipatchEvent = true;

    return super.disconnect();
  }

  setAuth(authMaps: SettingAuthValue[]) {
    const auth: Record<string, string> = {};

    for (const authMap of authMaps) {
      if (authMap.key === '' || authMap.value === '') {
        continue;
      }

      auth[authMap.key] = authMap.value;
    }

    this.auth = auth;
  }

  setListeners(events: string[]) {
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
      SocketLogEvent.dispatchPub(event, ...args);
      AlertEvent.dispatch({
        variant: 'success',
        message: `send "${event}" with ${JSON.stringify(args, null, 2)}`,
      });
    }

    return super.emit(event, ...args);
  }
}
