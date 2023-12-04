import { FunctionComponent } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { connectionStore } from '@/store';
import { connectionHook, socketHook, tabHook } from '@/hook';

import { ConnectionDefault } from './connection-default';
import { ConnectionAuthList } from './connection-auth-list';
import { ConnectionListenerList } from './connection-listener-list';

export const Connection: FunctionComponent = () => {
  const tabProps = tabHook.useProps();

  const [connection, setConnection] = connectionStore.useState();

  connectionHook.useCache();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500,
      }}
    >
      <Tabs value={tabProps.value} onChange={tabProps.onChange} centered>
        <Tab label="DEFAULT" value={0} />
        <Tab label="AUTH" value={1} />
        <Tab label="LISTENER" value={2} />
      </Tabs>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={socketHook.useConnectHandler(connection)}>Connect</Button>
      </Box>

      <Box sx={{ display: tabProps.value === 0 ? 'flex' : 'none' }}>
        <ConnectionDefault
          url={connection.url}
          nsp={connection.nsp}
          transport={connection.transport}
          setConnection={setConnection}
        />
      </Box>
      <Box sx={{ display: tabProps.value === 1 ? 'flex' : 'none' }}>
        <ConnectionAuthList values={connection.auths} setConnection={setConnection} />
      </Box>
      <Box sx={{ display: tabProps.value === 2 ? 'flex' : 'none' }}>
        <ConnectionListenerList values={connection.listenEventNames} setConnection={setConnection} />
      </Box>
    </Box>
  );
};
