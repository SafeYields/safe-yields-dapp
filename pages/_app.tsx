import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Web3ReactProvider } from '@web3-react/core';
import { NextPageWithLayout } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { getLibrary } from 'utils';

import { GlobalStyleProvider } from '../style/GlobalStyleProvider';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const Web3ProviderNetwork = dynamic(() => import('components/Web3ProviderNetwork/index'), {
  ssr: false,
});

function _App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getPageLayout = Component.getLayout || ((page) => page);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <GlobalStyleProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              colors: {
                veryDarkGreen: ['#040A01'],
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
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default _App;
