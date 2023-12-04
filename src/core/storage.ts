import { SocketClient } from './socket-client';

export class Storage {
  socket: SocketClient | null = null;
}

export const storage = new Storage();
