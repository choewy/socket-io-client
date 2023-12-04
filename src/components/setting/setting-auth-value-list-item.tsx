import { FunctionComponent } from 'react';

import { ListItem, ListItemButton, TextField, TextFieldProps } from '@mui/material';

import { SettingAuthValue } from '@/store';
import { settingHook } from '@/hook';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

type SettingAuthValueListItemProps = {
  index: number;
  value: SettingAuthValue;
};

export const SettingAuthValueListItem: FunctionComponent<SettingAuthValueListItemProps> = ({ index, value }) => {
  return (
    <ListItem>
      <TextField
        {...textFieldProps}
        label="Key"
        value={value.key}
        onChange={settingHook.useAuthValueChangeHandler(index, 'key')}
      />
      <TextField
        {...textFieldProps}
        label="Value"
        fullWidth
        value={value.value}
        onChange={settingHook.useAuthValueChangeHandler(index, 'value')}
      />
      <ListItemButton onClick={settingHook.useRemoveAuthValueHandler(index)}>X</ListItemButton>
    </ListItem>
  );
};
