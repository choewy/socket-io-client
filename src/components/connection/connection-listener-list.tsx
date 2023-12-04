import { FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Box, Button, List } from '@mui/material';

import { SettingStoreValue } from '@/store';

import { ConnectionListItem } from './connection-listener-list-item';

export type ConnectionListenerListProps = {
  values: string[];
  setSetting: SetterOrUpdater<SettingStoreValue>;
};

export const ConnectionListenerList: FunctionComponent<ConnectionListenerListProps> = ({ values, setSetting }) => {
  const onClickButton = useCallback(
    () => setSetting((prev) => ({ ...prev, eventNames: [...prev.eventNames, ''] })),
    [setSetting],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <ConnectionListItem
            key={['connection_listener', i].join('_')}
            index={i}
            value={value}
            setSetting={setSetting}
          />
        ))}
      </List>
      <Button onClick={onClickButton}>+</Button>
    </Box>
  );
};
