import { FunctionComponent } from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';

import { cacheHook } from '@/hook';
import { CacheStoreValue } from '@/store';

export type SettingListItemProps = {
  index: number;
  cache: CacheStoreValue;
};

export const ConnectionCacheAccordion: FunctionComponent<SettingListItemProps> = ({ index, cache }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{cache.setting.url}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <pre>
          <code>{JSON.stringify(cache.setting, null, 2)}</code>
        </pre>
      </AccordionDetails>
      <AccordionActions>
        <Button size="small" onClick={cacheHook.useUseHandler(index)}>
          Use
        </Button>
        <Button size="small" color="error" onClick={cacheHook.useDeleteHandler(index)}>
          Remove
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
