import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { ListItem, TextField, TextFieldProps } from '@mui/material';

import { ConnectionAuthValue, ConnectionStoreValue } from '@/store';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

type ConnectionAuthListItemProps = {
  index: number;
  value: ConnectionAuthValue;
  setConnection: SetterOrUpdater<ConnectionStoreValue>;
};

export const ConnectionAuthListItem: FunctionComponent<ConnectionAuthListItemProps> = ({
  index,
  value,
  setConnection,
}) => {
  const onChangeKey = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setConnection((prev) => ({
        ...prev,
        auths: prev.auths.map((auth, i) => (i === index ? { ...auth, key: e.target.value } : auth)),
      })),
    [index, setConnection],
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setConnection((prev) => ({
        ...prev,
        auths: prev.auths.map((auth, i) => (i === index ? { ...auth, value: e.target.value } : auth)),
      })),
    [index, setConnection],
  );

  return (
    <ListItem>
      <TextField {...textFieldProps} label="Key" value={value.key} onChange={onChangeKey} />
      <TextField {...textFieldProps} label="Value" fullWidth value={value.value} onChange={onChangeValue} />
    </ListItem>
  );
};
