import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { connectionCacheStore } from '@/store';
import { connectionCacheHook } from '@/hook';

import { ConnectionCacheAccordion } from './connection-cache-accordion';

export const ConnectionCaches: FunctionComponent = () => {
  const caches = connectionCacheStore.useValue();

  connectionCacheHook.useListener();

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Box
        sx={{
          backgroundColor: '#eee',
          width: '100%',
          height: '100%',
          overflow: 'scroll',
          padding: 5,
          boxSizing: 'border-box',
        }}
      >
        {caches.map((cache, i) => (
          <ConnectionCacheAccordion key={['connection-cache', i].join('_')} index={i} cache={cache} />
        ))}
      </Box>
    </Box>
  );
};
