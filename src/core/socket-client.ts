import { Manager, ManagerOptions, Socket } from 'socket.io-client';

export class SocketClient extends Socket {
  constructor(url: string, options: Partial<ManagerOptions>, nsp = '') {
    if (nsp.startsWith('/') === false) {
      nsp = `/${nsp}`;
    }

    options.autoConnect = false;
    options.transports = ['websocket'];

    super(new Manager(url, options), nsp);
  }
}
