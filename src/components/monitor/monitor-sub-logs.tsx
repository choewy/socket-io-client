import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { SubLog } from '@/store';

export type MonitorSubLogsProps = {
  logs: SubLog[];
};

export const MonitorSubLogs: FunctionComponent<MonitorSubLogsProps> = ({ logs }) => {
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
