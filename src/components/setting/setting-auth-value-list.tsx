import { FunctionComponent } from 'react';

import { Box, Button, List } from '@mui/material';

import { SettingAuthValue } from '@/store';
import { settingHook } from '@/hook';

import { SettingAuthValueListItem } from './setting-auth-value-list-item';

type SettingAuthValueListProps = {
  values: SettingAuthValue[];
};

export const SettingAuthValueList: FunctionComponent<SettingAuthValueListProps> = ({ values }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <SettingAuthValueListItem key={['connection_auth', i].join('_')} index={i} value={value} />
        ))}
      </List>
      <Button onClick={settingHook.useAddAuthValueHandler()} variant="outlined">
        +
      </Button>
    </Box>
  );
};
