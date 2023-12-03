import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { PubLog } from '@/store';

export type MonitorPubLogsProps = {
  logs: PubLog[];
};

export const MonitorPubLogs: FunctionComponent<MonitorPubLogsProps> = ({ logs }) => {
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
        <code>{JSON.stringify(logs, null, 2)}</code>
      </pre>
    </Box>
  );
};
