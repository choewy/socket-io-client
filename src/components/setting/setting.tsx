import { FunctionComponent } from 'react';

import { Box, Button, Tab, Tabs } from '@mui/material';

import { settingStore } from '@/store';
import { settingHook, socketHook, tabHook } from '@/hook';

import { SettingConnection } from './setting-connection';
import { SettingAuthValueList } from './setting-auth-value-list';
import { SettingEventNameList } from './setting-event-name-list';

export const Setting: FunctionComponent = () => {
  const tabProps = tabHook.useProps();

  const setting = settingStore.useValue();

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={settingHook.useResetHandler()}>Reset</Button>
        <Button onClick={socketHook.useConnectHandler(setting)}>Connect</Button>
      </Box>

      <Tabs value={tabProps.value} onChange={tabProps.onChange} centered>
        <Tab label="CONNECTION" value={0} />
        <Tab label="AUTH" value={1} />
        <Tab label="LISTENER" value={2} />
      </Tabs>
      <Box sx={{ display: tabProps.value === 0 ? 'flex' : 'none' }}>
        <SettingConnection url={setting.url} nsp={setting.nsp} transport={setting.transport} />
      </Box>
      <Box sx={{ display: tabProps.value === 1 ? 'flex' : 'none' }}>
        <SettingAuthValueList values={setting.authValues} />
      </Box>
      <Box sx={{ display: tabProps.value === 2 ? 'flex' : 'none' }}>
        <SettingEventNameList values={setting.eventNames} />
      </Box>
    </Box>
  );
};
