import { FunctionComponent, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { AlertStoreValue } from '@/store';

export type AlertContentProps = {
  alert: AlertStoreValue | null;
};

export const AlertContent: FunctionComponent<AlertContentProps> = ({ alert }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (alert == null) {
      return;
    }

    enqueueSnackbar(alert);
  }, [alert, enqueueSnackbar]);

  return null;
};
