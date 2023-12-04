import { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';

import { Box, Button, TextField, TextFieldProps } from '@mui/material';

import { storage } from '@/core';

import { MonitorLogs } from './monitor-logs';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

export const Monitor: FunctionComponent = () => {
  const [pubInfo, setPubInfo] = useState<{ event: string; payload: string }>({
    event: '',
    payload: '',
  });

  const onChangeEvent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPubInfo((prev) => ({ ...prev, event: e.target.value })),
    [setPubInfo],
  );

  const onChangePayload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPubInfo((prev) => ({ ...prev, payload: e.target.value })),
    [setPubInfo],
  );

  const onClickSend = useCallback(() => {
    if (storage.socket == null || storage.socket.disconnected) {
      return;
    }

    if (pubInfo.event === '') {
      return;
    }

    let payload: JSON = null;

    try {
      payload = JSON.parse(pubInfo.payload);
    } catch {}

    storage.socket.emit(pubInfo.event, payload);
  }, [pubInfo]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', mb: 1 }}>
          <TextField
            {...textFieldProps}
            label="Event"
            sx={{ flex: 1 }}
            value={pubInfo.event}
            onChange={onChangeEvent}
          />
          <TextField
            {...textFieldProps}
            label="Payload"
            sx={{ flex: 3 }}
            value={pubInfo.payload}
            onChange={onChangePayload}
          />
        </Box>
        <Button onClick={onClickSend}>Send</Button>
      </Box>
      <MonitorLogs />
    </Box>
  );
};
