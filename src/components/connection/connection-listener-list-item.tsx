import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { ListItem, TextField, TextFieldProps } from '@mui/material';

import { SettingStoreValue } from '@/store';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

export type ConnectionListenerListItemProps = {
  index: number;
  value: string;
  setSetting: SetterOrUpdater<SettingStoreValue>;
};

export const ConnectionListItem: FunctionComponent<ConnectionListenerListItemProps> = ({
  index,
  value,
  setSetting,
}) => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSetting((prev) => ({
        ...prev,
        eventNames: prev.eventNames.map((eventName, i) => (i === index ? e.target.value : eventName)),
      }));
    },
    [index, setSetting],
  );

  return (
    <ListItem>
      <TextField {...textFieldProps} label="Event Name" fullWidth value={value} onChange={onChange} />
    </ListItem>
  );
};
