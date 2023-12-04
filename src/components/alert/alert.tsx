import { FunctionComponent } from 'react';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';

import styled from '@emotion/styled';

import { alertHook } from '@/hook';

import { AlertContent } from './alert-content';

export const Alert: FunctionComponent = () => {
  alertHook.useListener();

  return (
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={3000}
      Components={{
        info: styled(MaterialDesignContent)(() => ({
          '&.notistack-MuiContent-info': {},
        })),
      }}
    >
      <AlertContent alert={alertHook.useConsumer()} />
    </SnackbarProvider>
  );
};
