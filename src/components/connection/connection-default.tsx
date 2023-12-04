import { ChangeEvent, FunctionComponent, ReactNode, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import {
  Box,
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { SettingStoreValue, SocketTransport } from '@/store';

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

export type ConnectionDefaultProps = {
  url: string;
  nsp: string;
  transport: SocketTransport;
  setSetting: SetterOrUpdater<SettingStoreValue>;
};

export const ConnectionDefault: FunctionComponent<ConnectionDefaultProps> = ({ url, nsp, transport, setSetting }) => {
  const onChangeUrl = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSetting((prev) => ({ ...prev, url: e.target.value })),
    [setSetting],
  );

  const onChangeNsp = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSetting((prev) => ({ ...prev, nsp: e.target.value })),
    [setSetting],
  );

  const onChangeTransport = useCallback(
    (e: SelectChangeEvent<SocketTransport>, _: ReactNode) =>
      setSetting((prev) => ({ ...prev, transport: e.target.value as SocketTransport })),
    [setSetting],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField {...textFieldProps} label="URL" value={url} onChange={onChangeUrl} />
      <TextField {...textFieldProps} label="Namespace" value={nsp} onChange={onChangeNsp} />
      <FormControl {...formControlProps}>
        <InputLabel id="connection-transport">Transport</InputLabel>
        <Select id="connection-transport" label="Transport" value={transport} onChange={onChangeTransport}>
          <MenuItem value={SocketTransport.Polling}>{SocketTransport.Polling}</MenuItem>
          <MenuItem value={SocketTransport.Websocket}>{SocketTransport.Websocket}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
