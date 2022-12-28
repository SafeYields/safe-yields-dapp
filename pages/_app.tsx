import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPageWithLayout } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { GlobalStyleProvider } from 'style/GlobalStyleProvider';


interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const Web3Provider = dynamic(() => import('components/Web3Provider/index'), { ssr: false });

function _App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getPageLayout = Component.getLayout || ((page) => page);
  return (
    <Web3Provider>
      <GlobalStyleProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
            colors: {
              veryDarkGreen: ['#040A01'],
              highlightGreen: ['#D1DE5D'],
              mustardGreen: ['#C9D94E'],
              orange: ['#F08906'],
              white: ['#FFFFFF'],
            },
            fontFamily: 'Gotham, sans-serif',
            lineHeight: '19px',
            fontSizes: {
              xs: 10,
              sm: 12,
              md: 15,
              lg: 16,
              xl: 80,
            },
            primaryColor: 'white',
            loader: 'dots',
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
            headings: {
              fontFamily: 'Gotham, sans-serif',
              sizes: {
                h1: { fontSize: 80 },
              },
            },
            defaultGradient: {
              from: 'mustardGreen',
              to: 'orange',
              deg: 90,
            },
            activeStyles: {
              backgroundColor: 'veryDarkGreen',
            },
            components: {
              Button: {
                defaultProps: {
                  size: 'xs',
                  color: 'cyan',
                },
              },
              Container: {
                defaultProps: {
                  sizes: {
                    xs: 540,
                    sm: 720,
                    md: 960,
                    lg: 1140,
                    xl: 1320,
                  },
                },
              },
            },
          }}
        >
          <NotificationsProvider>
            {getPageLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </MantineProvider>
      </GlobalStyleProvider>
    </Web3Provider>
  );
}

export default _App;
