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
        <meta name='theme-color' content='#D9E022' />
      </Head>
      <Web3Provider>
        <GlobalStyleProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
              black: 'white',
              colors: {
                sideMenuBackgroundBlue: ['#013D43'],
                highlightGreen: ['#D1DE5D'],
                mustardGreen: ['#CEDB3F'],
                limeGreen: ['#D9E022', '#CBDA49'],
                orange: ['#E89B17', '#F28705'],
                white: ['#F2ECE4'],
                greenGray: ['#36676A'],
                almostWhite: ['#F5F5F5'],
                veryDarkGreen: ['#0B1B03']
              },
              fontFamily: '"Space Grotesk", sans-serif',
              lineHeight: '19px',
              fontSizes: {
                xs: 10,
                sm: 16,
                md: 16,
                lg: 16,
                xl: 20,
              },
              primaryColor: 'white',
              loader: 'dots',
              spacing: { xs: 12, sm: 20, md: 25, lg: 30, xl: 64 },
              headings: {
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 450,
                sizes: {
                  h1: { fontSize: 36, lineHeight: '43px' },
                  h3: { fontSize: 24, lineHeight: '29px', fontWeight: 700 },
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
                Notification: {
                  defaultProps: {
                    shadow: 'sm',
                    radius: 'lg',
                    size: 'lg',
                    transitionDuration: 0,
                    transitionTimingFunction: 'ease',
                    transitionProperty: 'all',
                    transitionDelay: 0,
                    styles: {
                      root: {
                        minWidth: '300px',
                        color: 'white',
                        padding: '0',
                        lineHeight: '18px',
                        fontWeight: 325,
                        borderRadius: '21px',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        margin: '10px',
                        marginTop: '5px',
                        marginBottom: '5px',
                        marginLeft: '10px',
                        marginRight: '10px',
                        borderWidth: '0px',
                        borderStyle: 'solid',
                        borderColor: 'transparent',
                        backgroundClip: 'padding-box',
                        position: 'relative',
                        boxSizing: 'border-box',
                        background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(3px)',
                        wordWrap: 'break-word',
                        '&::before': { backgroundColor: 'white' },
                      },
                      title: { color: 'white' },
                      description: { color: 'white', wordWrap: 'break-word', wordBreak: 'break-word' },
                      closeButton: {
                        color: 'white',
                        '&:hover': { backgroundColor: 'orange' },
                      },
                      loading: false,
                    },
                  },
                },
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
                Modal: {
                  styles: (theme) => ({
                    modal: {
                      background: 'url("/assets/nft-modal-background.png"), linear-gradient(180deg, rgba(242, 236, 228, 0.5) 0%, rgba(242, 236, 228, 0.6) 45.31%, rgba(242, 236, 228, 0.3) 100%) top/cover no-repeat',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(3px)',
                      borderRadius: '15px 15px 15px 15px',
                      height: `${169+176}px`,
                      width: '578px',
                      border: 0,
                      padding: 'sm'
                    },
                    close: {
                      background: 'linear-gradient(90deg, #CEDB3F, #E89B17,#CEDB3F, #E89B17)',
                      borderRadius: '46px',
                      size: 'sm',
                      color: 'white',
                      border: 0,
                      backgroundSize: '300% 100%',
                      mozTransition: 'all 0.4s ease-in-out',
                      oTransition: 'all 0.4s ease-in-out',
                      webkitTransition: 'all 0.4s ease-in-out',
                      transition: 'all 0.4s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 1px 2px 0 rgba(229, 66, 10, 0.85)',
                        backgroundPosition: '100% 0',
                        mozTransition: 'all 0.4s ease-in-out',
                        oTransition: 'all 0.4s ease-in-out',
                        webkitTransition: 'all 0.4s ease-in-out',
                        transition: 'all 0.4s ease-in-out',
                      },
                    },
                  }),
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
