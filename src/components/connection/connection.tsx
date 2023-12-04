import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { connectionStore, logsStore } from '@/store';
import { SocketClient, socketStorage } from '@/core';
import { connectionCacheService } from '@/service';
import { connectionHook } from '@/hook';

import { ConnectionDefault } from './connection-default';
import { ConnectionAuthList } from './connection-auth-list';
import { ConnectionListenerList } from './connection-listener-list';

export const Connection: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const setLogs = logsStore.useSetState();

  const [{ url, nsp, transport, auths, listenEventNames }, setConnection] = connectionStore.useState();

  connectionHook.useCache();

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

    connectionCacheService.setValue({
      date: new Date(),
      connection: { url, nsp, transport, auths, listenEventNames },
    });

    if (socketStorage.current) {
      if (socketStorage.current.connected) {
        socketStorage.current.disconnect();
      }

      socketStorage.current = null;
    }

    setLogs({ pub: [], sub: [] });

    const socket = new SocketClient({ setLogs }, { url, transport, nsp });

    socket.initAuth(auths);
    socket.initListeners(listenEventNames);

    socketStorage.current = socket;
    socketStorage.current.connect();
  }, [url, nsp, transport, auths, listenEventNames, setLogs]);

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
        <ConnectionDefault url={url} nsp={nsp} transport={transport} setConnection={setConnection} />
      </Box>
      <Box sx={{ display: tabIndex === 1 ? 'flex' : 'none' }}>
        <ConnectionAuthList values={auths} setConnection={setConnection} />
      </Box>
      <Box sx={{ display: tabIndex === 2 ? 'flex' : 'none' }}>
        <ConnectionListenerList values={listenEventNames} setConnection={setConnection} />
      </Box>
    </Box>
  );
};
