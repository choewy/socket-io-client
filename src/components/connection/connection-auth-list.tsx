import { FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Box, Button, List } from '@mui/material';

import { SettingAuthValue, SettingStoreValue } from '@/store';

import { ConnectionAuthListItem } from './connection-auth-list-item';

type ConnectionAuthListProps = {
  values: SettingAuthValue[];
  setSetting: SetterOrUpdater<SettingStoreValue>;
};

export const ConnectionAuthList: FunctionComponent<ConnectionAuthListProps> = ({ values, setSetting }) => {
  const onClickButton = useCallback(
    () => setSetting((prev) => ({ ...prev, authValues: [...prev.authValues, { key: '', value: '' }] })),
    [setSetting],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <ConnectionAuthListItem
            key={['connection_auth', i].join('_')}
            index={i}
            value={value}
            setConnection={setSetting}
          />
        ))}
      </List>
      <Button onClick={onClickButton}>+</Button>
    </Box>
  );
};
