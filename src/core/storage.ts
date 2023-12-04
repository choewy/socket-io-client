import { SocketClient } from './socket-client';

export class SocketStorage {
  current: SocketClient | null = null;
}

export const socketStorage = new SocketStorage();
