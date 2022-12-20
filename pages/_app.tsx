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
              fontFamily: 'Gotham, sans serif',
              spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
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
