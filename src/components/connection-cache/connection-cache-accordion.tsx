import { FunctionComponent } from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';

import { cacheHook } from '@/hook';
import { CacheStoreValue } from '@/store';
import { DateTime } from 'luxon';

export type SettingListItemProps = {
  settingId: string;
  cache: CacheStoreValue;
};

export const ConnectionCacheAccordion: FunctionComponent<SettingListItemProps> = ({ settingId, cache }) => {
  const { id, ...setting } = cache.setting;

  const isCurrent = settingId === id;

  return (
    <Accordion defaultExpanded={settingId === id}>
      <AccordionSummary sx={{ backgroundColor: isCurrent ? '#eff' : undefined }}>
        <Typography>{DateTime.fromJSDate(new Date(cache.date)).toFormat('yyyy-MM-dd HH:mm:ss')}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'scroll' }}>
        <pre>
          <code>{JSON.stringify(setting, null, 2)}</code>
        </pre>
      </AccordionDetails>
      <AccordionActions>
        <Button size="small" onClick={cacheHook.useLoadHandler(id)} disabled={isCurrent}>
          {isCurrent ? 'Used' : 'Load'}
        </Button>
        <Button size="small" color="error" onClick={cacheHook.useDeleteHandler(settingId, id)}>
          Delete
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
