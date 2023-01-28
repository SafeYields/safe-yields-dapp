import { Global } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import GlobalFonts from './GlobalFonts';

export const GlobalStyleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalFonts />
      <Global
        styles={
          {
            'html': {
              height: '100%',
              background: '#040A01',
              display: 'flex',
            },
            'body': {
              margin: 'auto',
            },
            '*': {
              wordBreak: 'break-all',
              webkitBoxSizing: 'border-box', mozBoxSizing: 'border-box', boxSizing: 'border-box',
            },
            'button, *[type="button"]': { transform: 'none !important' },
          }}
      />
      {children}
    </>
  );
};
