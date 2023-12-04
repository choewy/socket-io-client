import { FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Box, Button, List } from '@mui/material';

import { ConnectionStoreValue } from '@/store';

import { ConnectionListItem } from './connection-listener-list-item';

export type ConnectionListenerListProps = {
  values: string[];
  setConnection: SetterOrUpdater<ConnectionStoreValue>;
};

export const ConnectionListenerList: FunctionComponent<ConnectionListenerListProps> = ({ values, setConnection }) => {
  const onClickButton = useCallback(
    () => setConnection((prev) => ({ ...prev, listenEventNames: [...prev.listenEventNames, ''] })),
    [setConnection],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <ConnectionListItem
            key={['connection_listener', i].join('_')}
            index={i}
            value={value}
            setConnection={setConnection}
          />
        ))}
      </List>
      <Button onClick={onClickButton}>+</Button>
    </Box>
  );
};
