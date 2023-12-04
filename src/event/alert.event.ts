import { AlertStoreValue } from '@/store';

export class AlertEvent {
  static eventName = 'alert-event';

  static dispatch(alert: AlertStoreValue): void {
    window.dispatchEvent(new CustomEvent(this.eventName, { detail: alert }));
  }
}
