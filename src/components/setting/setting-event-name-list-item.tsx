import { FunctionComponent } from 'react';

import { Button, ListItem, TextField, TextFieldProps } from '@mui/material';

import { settingHook } from '@/hook';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
};

export type SettingEventNameListItemProps = {
  index: number;
  value: string;
};

export const SettingEventNameListItem: FunctionComponent<SettingEventNameListItemProps> = ({ index, value }) => {
  return (
    <ListItem>
      <TextField
        {...textFieldProps}
        label="Event Name"
        fullWidth
        value={value}
        onChange={settingHook.useEventNameChangeHandler(index)}
      />
      <Button onClick={settingHook.useRemoveEventNameHandler(index)}>X</Button>
    </ListItem>
  );
};
