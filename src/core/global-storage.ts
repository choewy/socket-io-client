import { SocketClient } from './socket-client';

export class GlobalStorage {
  socket: SocketClient | null = null;
}

export const globalStorage = new GlobalStorage();
