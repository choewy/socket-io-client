import { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Tabs, Tab } from '@mui/material';

import { tabProperties } from './tab';
import { tabHook } from './hook';
import { Alert } from './components';

export const App: FunctionComponent = () => {
  const tabProps = tabHook.useProps();

  return (
    <>
      <Helmet>
        <title>Socket.io Client</title>
      </Helmet>
      <Alert />

      <Box sx={{ width: '100%', position: 'sticky', top: 0, left: 0, background: '#eee', zIndex: 999 }}>
        <Tabs value={tabProps.value} onChange={tabProps.onChange} centered>
          {tabProperties.map((property, i) => (
            <Tab key={property.key} label={property.title} value={i} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        {tabProperties.map((property, value) => (
          <Box
            key={property.key}
            sx={{
              display: tabProps.value !== value ? 'none' : 'flex',
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
