import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

import { Box, TextField, TextFieldProps } from '@mui/material';

import { ConnectionStoreValue } from '@/store';

const textFieldProps: TextFieldProps = {
  size: 'small',
  autoComplete: 'off',
  sx: { my: 1.5 },
  fullWidth: true,
};

export type ConnectionDefaultProps = {
  url: string;
  nsp: string;
  setConnection: SetterOrUpdater<ConnectionStoreValue>;
};

export const ConnectionDefault: FunctionComponent<ConnectionDefaultProps> = ({ url, nsp, setConnection }) => {
  const onChangeUrl = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setConnection((prev) => ({ ...prev, url: e.target.value })),
    [setConnection],
  );

  const onChangeNsp = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setConnection((prev) => ({ ...prev, nsp: e.target.value })),
    [setConnection],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField {...textFieldProps} label="URL" value={url} onChange={onChangeUrl} />
      <TextField {...textFieldProps} label="Namespace" value={nsp} onChange={onChangeNsp} />
    </Box>
  );
};
