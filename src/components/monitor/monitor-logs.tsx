import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { logsStore } from '@/store';

import { MonitorPubLogs } from './monitor-pub-logs';
import { MonitorSubLogs } from './monitor-sub-logs';

export const MonitorLogs: FunctionComponent = () => {
  const logs = logsStore.useValue();

  return (
    <Box
      sx={{
        width: '100%',
        height: '90%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
    >
      <MonitorPubLogs logs={logs.pub} />
      <MonitorSubLogs logs={logs.sub} />
    </Box>
  );
};
