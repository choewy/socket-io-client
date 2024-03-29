import { SettingStoreValue } from '@/store';

import { SocketClient } from './socket.client';
import { SocketLogEvent } from '@/event';

export class SocketService {
  client: SocketClient | null = null;

  clearClient() {
    if (this.client instanceof SocketClient) {
      this.client.disconnect();
      this.client = null;
    }

    SocketLogEvent.dispatchInit();
  }

  createClient(setting: SettingStoreValue) {
    this.clearClient();

    this.client = new SocketClient({
      url: setting.url,
      transport: setting.transport,
      nsp: setting.nsp,
    });

    this.client.setAuth(setting.authValues);
    this.client.setListeners(setting.eventNames);
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
