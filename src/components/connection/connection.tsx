import { v4 } from 'uuid';
import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { SocketClient, globalStorage } from '@/core';
import { connectionStore, logsStore } from '@/store';

import { ConnectionDefault } from './connection-default';
import { ConnectionAuthList } from './connection-auth-list';
import { ConnectionListenerList } from './connection-listener-list';

export const Connection: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const setLogs = logsStore.useSetState();

  const [{ url, nsp, auths, listeners }, setConnection] = connectionStore.useState();

  const pushSubLogs = useCallback(
    (event: string, ...args: any[]) =>
      setLogs((prev) => ({
        ...prev,
        sub: [...prev.sub, { key: v4(), event, response: args, date: new Date() }],
      })),
    [setLogs],
  );

  const onChangeTab = useCallback(
    (_: SyntheticEvent<Element, Event>, value: number | string) => {
      value = Number(value);

      if (Number.isNaN(value)) {
        return;
      }

      setTabIndex(value);
    },
    [setTabIndex],
  );

  const onClickConnect = useCallback(() => {
    if (url == null || url === '') {
      return;
    }

    if (globalStorage.socket) {
      if (globalStorage.socket.connected) {
        globalStorage.socket.disconnect();
      }

      globalStorage.socket = null;
    }

    setLogs({ pub: [], sub: [] });

    const socket = new SocketClient(url, {}, nsp);

    socket.on('ping', () => pushSubLogs('ping'));
    socket.on('connect', () => pushSubLogs('connect'));
    socket.on('connect_error', (e) => pushSubLogs('connect_error', e));
    socket.on('disconnect', (reason, description) => pushSubLogs('disconnect', { reason, description }));
    socket.on('error', (e) => pushSubLogs('error', e));
    socket.on('exception', (...args: any) => pushSubLogs('exception', ...args));

    for (const listener of listeners) {
      if (listener === '') {
        continue;
      }

      socket.on(listener, (...args) => pushSubLogs(listener, ...args));
    }

    const socketAuth: Record<string, string> = {};

    for (const auth of auths) {
      if (auth.key === '' || auth.value === '') {
        continue;
      }

      socketAuth[auth.key] = auth.value;
    }

    socket.auth = socketAuth;

    globalStorage.socket = socket;
    globalStorage.socket.connect();
  }, [url, nsp, auths, listeners, setLogs, pushSubLogs]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
      }}
    >
      <Tabs value={tabIndex} onChange={onChangeTab} centered>
        <Tab label="DEFAULT" value={0} />
        <Tab label="AUTH" value={1} />
        <Tab label="LISTENER" value={2} />
      </Tabs>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={onClickConnect}>Connect</Button>
      </Box>

      <Box sx={{ display: tabIndex === 0 ? 'flex' : 'none' }}>
        <ConnectionDefault url={url} nsp={nsp} setConnection={setConnection} />
      </Box>
      <Box sx={{ display: tabIndex === 1 ? 'flex' : 'none' }}>
        <ConnectionAuthList values={auths} setConnection={setConnection} />
      </Box>
      <Box sx={{ display: tabIndex === 2 ? 'flex' : 'none' }}>
        <ConnectionListenerList values={listeners} setConnection={setConnection} />
      </Box>
    </Box>
  );
};
