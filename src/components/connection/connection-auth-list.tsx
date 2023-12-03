import { FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Box, Button, List } from '@mui/material';

import { ConnectionAuthValue, ConnectionStoreValue } from '@/store';

import { ConnectionAuthListItem } from './connection-auth-list-item';

type ConnectionAuthListProps = {
  values: ConnectionAuthValue[];
  setConnection: SetterOrUpdater<ConnectionStoreValue>;
};

export const ConnectionAuthList: FunctionComponent<ConnectionAuthListProps> = ({ values, setConnection }) => {
  const onClickButton = useCallback(
    () => setConnection((prev) => ({ ...prev, auths: [...prev.auths, { key: '', value: '' }] })),
    [setConnection],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <List>
        {values.map((value, i) => (
          <ConnectionAuthListItem
            key={['connection_auth', i].join('_')}
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
