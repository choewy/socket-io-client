import { v4 } from 'uuid';
import { ReactElement } from 'react';

import { Connection, Monitor, ConnectionCaches } from './components';

const key = [v4(), 'tab'].join('_');

export type TabProperty = {
  key: string;
  title: string;
  component: ReactElement;
};

export const tabProperties: TabProperty[] = [
  {
    key: [key, 'CONNECTION'].join('_'),
    title: 'CONNECTION',
    component: <Connection />,
  },
  {
    key: [key, 'MONITOR'].join('_'),
    title: 'MONITOR',
    component: <Monitor />,
  },
  {
    key: [key, 'CONNECTION CACHE'].join('_'),
    title: 'CONNECTION CACHE',
    component: <ConnectionCaches />,
  },
];
