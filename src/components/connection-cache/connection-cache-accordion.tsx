import { FunctionComponent } from 'react';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';

import { connectionCacheHook } from '@/hook';
import { ConnectionCache } from '@/service';

export type SettingListItemProps = {
  index: number;
  cache: ConnectionCache;
};

export const ConnectionCacheAccordion: FunctionComponent<SettingListItemProps> = ({ index, cache }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{cache.connection.url}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <pre>
          <code>{JSON.stringify(cache.connection, null, 2)}</code>
        </pre>
      </AccordionDetails>
      <AccordionActions>
        <Button size="small" onClick={connectionCacheHook.useUseHandler(index)}>
          Use
        </Button>
        <Button size="small" color="error" onClick={connectionCacheHook.useDeleteHandler(index)}>
          Remove
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
