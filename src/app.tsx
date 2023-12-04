import { FunctionComponent, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import { tabProperties } from './tab';
import { connectionStore } from './store';
import { localStorageService } from './core';
import { Alert } from './components';

export const App: FunctionComponent = () => {
  const setConnection = connectionStore.useSetState();

  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    const connectionValue = localStorageService.getValueByLastest();

    if (connectionValue == null) {
      return;
    }

    setConnection(connectionValue.connection);
  }, [setConnection]);

  const onChangeTabIndex = useCallback(
    (_: SyntheticEvent<Element, Event>, value: string | number) => {
      value = Number(value);

      if (Number.isNaN(value)) {
        return;
      }

      setTabIndex(value);
    },
    [setTabIndex],
  );

  return (
    <>
      <Alert />

      <Box sx={{ width: '100%', position: 'sticky', top: 0, left: 0, background: '#eee', zIndex: 999 }}>
        <Tabs value={tabIndex} onChange={onChangeTabIndex} centered>
          {tabProperties.map((property, i) => (
            <Tab key={property.key} label={property.title} value={i} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        {tabProperties.map((property, i) => (
          <Box
            key={property.key}
            sx={{
              display: tabIndex !== i ? 'none' : 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '90vh',
              padding: 5,
              boxSizing: 'border-box',
            }}
          >
            {property.component}
          </Box>
        ))}
      </Box>
    </>
  );
};
