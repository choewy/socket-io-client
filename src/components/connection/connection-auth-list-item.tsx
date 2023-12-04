import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { ListItem, TextField, TextFieldProps } from '@mui/material';

import { SettingAuthValue, SettingStoreValue } from '@/store';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

type ConnectionAuthListItemProps = {
  index: number;
  value: SettingAuthValue;
  setConnection: SetterOrUpdater<SettingStoreValue>;
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
        auths: prev.authValues.map((authValue, i) => (i === index ? { ...authValue, key: e.target.value } : authValue)),
      })),
    [index, setConnection],
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setConnection((prev) => ({
        ...prev,
        auths: prev.authValues.map((authValue, i) =>
          i === index ? { ...authValue, value: e.target.value } : authValue,
        ),
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
