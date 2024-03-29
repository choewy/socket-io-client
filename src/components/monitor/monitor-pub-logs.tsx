import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { SocketPubLog } from '@/store';

export type MonitorPubLogsProps = {
  logs: SocketPubLog[];
};

export const MonitorPubLogs: FunctionComponent<MonitorPubLogsProps> = ({ logs }) => {
  const rows = logs.map(({ key, ...log }) => log);

  return (
    <Box
      sx={{
        backgroundColor: '#eee',
        padding: 2,
        boxSizing: 'border-box',
        overflowY: 'scroll',
      }}
    >
      <pre>
        <code>{JSON.stringify(rows, null, 2)}</code>
      </pre>
    </Box>
  );
};
