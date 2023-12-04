import { v4 } from 'uuid';
import { ReactElement } from 'react';

import { Setting, Monitor, CacheList } from './components';

const key = [v4(), 'tab'].join('_');

export type TabProperty = {
  key: string;
  title: string;
  component: ReactElement;
};

export const tabProperties: TabProperty[] = [
  {
    key: [key, 'SETTING'].join('_'),
    title: 'SETTING',
    component: <Setting />,
  },
  {
    key: [key, 'MONITOR'].join('_'),
    title: 'MONITOR',
    component: <Monitor />,
  },
  {
    key: [key, 'STORAGE'].join('_'),
    title: 'STORAGE',
    component: <CacheList />,
  },
];
