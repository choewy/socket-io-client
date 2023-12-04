import { FunctionComponent } from 'react';

import {
  Box,
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { SocketTransport } from '@/store';
import { settingHook } from '@/hook';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
  sx: { my: 1.5 },
  fullWidth: true,
};

const formControlProps: FormControlProps = {
  size: 'small',
  sx: { my: 1.5 },
  fullWidth: true,
};

export type SettingConnectionProps = {
  url: string;
  nsp: string;
  transport: SocketTransport;
};

export const SettingConnection: FunctionComponent<SettingConnectionProps> = ({ url, nsp, transport }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField {...textFieldProps} label="URL" value={url} onChange={settingHook.useChangeValueHandler('url')} />
      <TextField
        {...textFieldProps}
        label="Namespace"
        value={nsp}
        onChange={settingHook.useChangeValueHandler('nsp')}
      />
      <FormControl {...formControlProps}>
        <InputLabel id="connection-transport">Transport</InputLabel>
        <Select
          id="connection-transport"
          label="Transport"
          value={transport}
          onChange={settingHook.useChangeTransportHandler()}
        >
          <MenuItem value={SocketTransport.Polling}>{SocketTransport.Polling}</MenuItem>
          <MenuItem value={SocketTransport.Websocket}>{SocketTransport.Websocket}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
