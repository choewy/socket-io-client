import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

import { cacheStore, settingStore } from '@/store';
import { cacheHook } from '@/hook';

import { CacheListItem } from './cache-list-item';

export const CacheList: FunctionComponent = () => {
  const setting = settingStore.useValue();
  const caches = cacheStore.useValue();

  cacheHook.useListener();

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
          <CacheListItem key={[cache.setting.id, i].join('_')} settingId={setting.id} cache={cache} />
        ))}
      </Box>
    </Box>
  );
};
