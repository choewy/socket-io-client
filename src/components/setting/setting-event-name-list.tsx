import { FunctionComponent } from 'react';

import { Box, Button, List } from '@mui/material';

import { settingHook } from '@/hook';

import { SettingEventNameListItem } from './setting-event-name-list-item';

export type SettingEventNameListProps = {
  values: string[];
};

export const SettingEventNameList: FunctionComponent<SettingEventNameListProps> = ({ values }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <SettingEventNameListItem key={['setting-event-name', i].join('_')} index={i} value={value} />
        ))}
      </List>
      <Button onClick={settingHook.useAddEventNameHanler()} variant="outlined">
        +
      </Button>
    </Box>
  );
};
