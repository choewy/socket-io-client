export class ConnectionCacheEvent {
  static eventName = 'connection-cache-change';

  static dispatch(): void {
    window.dispatchEvent(new Event(this.eventName));
  }
}
