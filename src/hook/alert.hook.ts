import { useCallback, useEffect, useState } from 'react';

import { AlertStoreValue, alertStore } from '@/store';

import { AlertEvent } from './alert.event';

export class AlertHook {
  useListener(): void {
    const setAlerts = alertStore.useSetState();

    const onAlert = useCallback(
      (e: Event) => {
        setAlerts((prev) => [...prev, (e as CustomEvent<AlertStoreValue>).detail]);
      },
      [setAlerts],
    );

    useEffect(() => {
      window.addEventListener(AlertEvent.eventName, onAlert);

      return () => {
        window.removeEventListener(AlertEvent.eventName, onAlert);
      };
    }, [onAlert]);
  }

  useConsumer(): AlertStoreValue | null {
    const [alerts, setAlerts] = alertStore.useState();
    const [alert, setAlert] = useState<AlertStoreValue | null>(null);

    useEffect(() => {
      if (alerts.length === 0) {
        return;
      }

      setAlert(alerts[0]);
      setAlerts((prev) => prev.slice(1));
    }, [alerts, setAlert, setAlerts]);

    return alert;
  }
}

export const alertHook = new AlertHook();
