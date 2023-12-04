import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { ListItem, TextField, TextFieldProps } from '@mui/material';

import { ConnectionStoreValue } from '@/store';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

export type ConnectionListenerListItemProps = {
  index: number;
  value: string;
  setConnection: SetterOrUpdater<ConnectionStoreValue>;
};

export const ConnectionListItem: FunctionComponent<ConnectionListenerListItemProps> = ({
  index,
  value,
  setConnection,
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConnection((prev) => ({
        ...prev,
        listenEventNames: prev.listenEventNames.map((listenEventName, i) =>
          i === index ? e.target.value : listenEventName,
        ),
      }));
    },
    [index, setConnection],
  );

  return (
    <ListItem>
      <TextField {...textFieldProps} label="Event Name" fullWidth value={value} onChange={onChange} />
    </ListItem>
  );
};
