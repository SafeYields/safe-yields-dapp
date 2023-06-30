import '@fontsource/space-grotesk';

import { Global } from '@mantine/core';
import type { FC, ReactNode } from 'react';

export const GlobalStyleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Global
        styles={(theme) => ({
          html: {
            height: '100%',
            background: '#040A01',
            display: 'flex',
          },
          body: {
            margin: 'auto',
            userSelect: 'none',
            overflowX: 'hidden',
          },
          main: {
            [theme.fn.smallerThan('sm')]: {
              height: 'calc(100vh - 145px)',
              marginTop: '145px',
            },
            [theme.fn.largerThan('sm')]: {
              height: 'calc(100vh - 120px)',
              marginTop: '120px',
            },
            overflowX: 'auto',
            minHeight: 'initial !important',
          },
          '*': {
            wordBreak: 'normal',
            webkitBoxSizing: 'border-box',
            mozBoxSizing: 'border-box',
            boxSizing: 'border-box',
            scrollbarWidth: 'thin',
            scrollbarColor: '#666 rgba(0,0,0,0.1)',
          },
          '::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#666',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#888',
          },
          'button, *[type="button"]': { transform: 'none !important' },
        })}
      />
      {children}
    </>
  );
};
