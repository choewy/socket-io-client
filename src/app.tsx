import { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import { tabProperties } from './tab';

export const App: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

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
