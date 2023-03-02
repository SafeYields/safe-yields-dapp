import '@fontsource/space-grotesk';

import { Global } from '@mantine/core';
import type { FC, ReactNode } from 'react';

export const GlobalStyleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
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
              userSelect: 'none',
            },
            '*': {
              wordBreak: 'normal',
              webkitBoxSizing: 'border-box', mozBoxSizing: 'border-box', boxSizing: 'border-box',
            },
            'button, *[type="button"]': { transform: 'none !important' },
          }}
      />
      {children}
    </>
  );
};
