import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { socketLogStore } from '@/store';
import { socketLogHook } from '@/hook';

import { MonitorPubLogs } from './monitor-pub-logs';
import { MonitorSubLogs } from './monitor-sub-logs';

export const MonitorLogs: FunctionComponent = () => {
  const log = socketLogStore.useValue();

  socketLogHook.useListener();

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
      <MonitorPubLogs logs={log.pub} />
      <MonitorSubLogs logs={log.sub} />
    </Box>
  );
};
