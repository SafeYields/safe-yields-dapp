import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPageWithLayout } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GlobalStyleProvider } from 'style/GlobalStyleProvider';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const Web3Provider = dynamic(() => import('components/Web3Provider/index'), { ssr: false });

function _App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getPageLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.svg' sizes='any' type='image/svg+xml' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon.svg' />
        <meta name='theme-color' content='##D9E022' />
      </Head>
      <Web3Provider>
        <GlobalStyleProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              colors: {
                sideMenuBackgroundBlue: ['#013D43'],
                highlightGreen: ['#D1DE5D'],
                mustardGreen: ['#CEDB3F'],
                limeGreen: ['#D9E022'],
                orange: ['#E89B17'],
                white: ['#F2ECE4'],
                greenGray: ['#36676A'],
                almostWhite: ['#F5F5F5'],
              },
              fontFamily: 'Gotham, sans-serif',
              lineHeight: '19px',
              fontSizes: {
                xs: 10,
                sm: 12,
                md: 15,
                lg: 16,
                xl: 20,
              },
              primaryColor: 'white',
              loader: 'dots',
              spacing: { xs: 12, sm: 20, md: 25, lg: 30, xl: 64 },
              headings: {
                fontFamily: 'Gotham, sans-serif',
                fontWeight: 450,
                sizes: {
                  h1: { fontSize: 36, lineHeight: '43px' },
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
    </>
  );
}

export default _App;
