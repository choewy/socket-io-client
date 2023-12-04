import { FunctionComponent } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { settingStore } from '@/store';
import { settingHook, socketHook, tabHook } from '@/hook';

import { ConnectionDefault } from './connection-default';
import { ConnectionAuthList } from './connection-auth-list';
import { ConnectionListenerList } from './connection-listener-list';

export const Connection: FunctionComponent = () => {
  const tabProps = tabHook.useProps();

  const [setting, setSetting] = settingStore.useState();

  settingHook.useCache();

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
        <Button onClick={socketHook.useConnectHandler(setting)}>Connect</Button>
      </Box>

      <Box sx={{ display: tabProps.value === 0 ? 'flex' : 'none' }}>
        <ConnectionDefault url={setting.url} nsp={setting.nsp} transport={setting.transport} setSetting={setSetting} />
      </Box>
      <Box sx={{ display: tabProps.value === 1 ? 'flex' : 'none' }}>
        <ConnectionAuthList values={setting.authValues} setSetting={setSetting} />
      </Box>
      <Box sx={{ display: tabProps.value === 2 ? 'flex' : 'none' }}>
        <ConnectionListenerList values={setting.eventNames} setSetting={setSetting} />
      </Box>
    </Box>
  );
};
