import { v4 } from 'uuid';

import { SocketPubLog, SocketSubLog } from '@/store';

export class SocketEvent {
  static initEventName = 'socket-init-event';
  static pubEventName = 'socket-pub-event';
  static subEventName = 'socket-sub-event';

  static dispatchInit() {
    window.dispatchEvent(new Event(this.initEventName));
  }

  static dispatchPub(event: string, ...args: any[]) {
    const payload = args.length < 2 ? args.shift() ?? null : args;

    window.dispatchEvent(
      new CustomEvent(this.pubEventName, {
        detail: { key: v4(), date: new Date(), event, payload } as SocketPubLog,
      }),
    );
  }

  static dispatchSub(event: string, ...args: any[]) {
    const response = args.length < 2 ? args.shift() ?? null : args;

    window.dispatchEvent(
      new CustomEvent(this.subEventName, {
        detail: { key: v4(), date: new Date(), event, response } as SocketSubLog,
      }),
    );
  }
}
