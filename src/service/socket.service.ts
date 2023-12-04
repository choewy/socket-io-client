import { ConnectionStoreValue } from '@/store';

import { SocketClient } from './socket.client';

export class SocketService {
  client: SocketClient | null = null;

  createClient(connection: ConnectionStoreValue) {
    console.log(connection);
    if (this.client instanceof SocketClient) {
      // send event(remove logs)

      this.client.disconnect();
      this.client = null;
    }

    this.client = new SocketClient({
      url: connection.url,
      transport: connection.transport,
      nsp: connection.nsp,
    });

    this.client.initAuth(connection.auths);
    this.client.initListeners(connection.listenEventNames);
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
