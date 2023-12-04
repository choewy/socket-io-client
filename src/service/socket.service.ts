import { SettingStoreValue } from '@/store';

import { SocketClient } from './socket.client';
import { SocketEvent } from '@/event';

export class SocketService {
  client: SocketClient | null = null;

  createClient(setting: SettingStoreValue) {
    if (this.client instanceof SocketClient) {
      SocketEvent.dispatchInit();
      this.client.disconnect();
      this.client = null;
    }

    this.client = new SocketClient({
      url: setting.url,
      transport: setting.transport,
      nsp: setting.nsp,
    });

    this.client.initAuth(setting.authValues);
    this.client.initListeners(setting.eventNames);
    this.client.connect();
  }

  sendMessage(event: string, ...args: any[]) {
    if (this.client == null || this.client.disconnected) {
      return;
    }

    this.client.emit(event, ...args);
  }
}

export const socketService = new SocketService();
