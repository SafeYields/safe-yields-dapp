import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/react';
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
                gray: ['#F2ECE42D'],
                transparentGray: ['rgba(255, 255, 255, 0.29)'],
                white: ['#F2ECE4'],
                greenGray: ['#36676A', '#85A7A8', '#90A4A2'],
                emeraldGreen: ['#053234'],
                almostWhite: ['#F5F5F5'],
                veryDarkGreen: ['#0B1B03'],
              },
              fontFamily: '"Space Grotesk", sans-serif',
              lineHeight: '19px',
              fontSizes: {
                xs: 10,
                sm: 12,
                md: 14,
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
                  h1: { fontSize: 64, lineHeight: '64px', fontWeight: 500 },
                  h2: { fontSize: 60, lineHeight: '60px', fontWeight: 500 },
                  h3: { fontSize: 24, lineHeight: '24px', fontWeight: 700 },
                  h4: { fontSize: 20, lineHeight: '20px', fontWeight: 700 },
                  h5: { fontSize: 40, lineHeight: '48px', fontWeight: 450 },
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
                        background:
                          'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(3px)',
                        wordWrap: 'normal',
                        '&::before': { backgroundColor: 'white' },
                      },
                      title: { color: 'white' },
                      description: {
                        color: 'white',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                      },
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
                    color: 'white',
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
                      background:
                        'linear-gradient(180deg, rgba(242, 236, 228, 0) 0%, rgba(242, 236, 228, 0) 49%, rgba(242, 236, 228, 0.1) 50%, rgba(242, 236, 228, 0.4)75%, rgba(242, 236, 228, 0.1) 100%), url("/assets/nft-modal-background.png") top/cover no-repeat',
                      // background: 'url("/assets/nft-modal-background.png"), linear-gradient(0deg, rgba(242, 236, 228, 0.5) 0%, rgba(242, 236, 228, 0.6)25%, rgba(242, 236, 228, 0.3) 50%) top/cover no-repeat',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(3px)',
                      borderRadius: '15px 15px 15px 15px',
                      height: `${169 + 176}px`,
                      width: '578px',
                      border: 0,
                      padding: 'sm',
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
                ToolTip: {
                  styles: (theme) => ({
                    tooltip: {
                      fontSize: 'md',
                      wordWrap: 'normal',
                    },
                  }),
                },
                Select: {
                  styles: (theme) => ({
                    input: {
                      width: '100%',
                      fontWeight: 700,
                      borderRadius: '99px',
                      border: 'none',
                      fontSize: '14px',
                      lineHeight: '14px',
                      backgroundColor: theme.colors.transparentGray[0],
                      color: theme.colors.emeraldGreen[0],
                    },
                    dropdown: {
                      padding: 0,
                      marginTop: -3,
                      borderRadius: 12,
                      border: 'none',
                      overflow: 'hidden',
                      color: theme.colors.emeraldGreen[0],
                      backgroundColor: theme.colors.greenGray[2],
                      '.mantine-ScrollArea-scrollbar': {
                        backgroundColor: theme.colors.greenGray[2],
                      },

                      '.mantine-ScrollArea-thumb': {
                        backgroundColor: theme.colors.transparentGray[0],
                        '&:hover': {
                          backgroundColor: 'rgba(152, 152, 154, 0.75) !important',
                        },
                      },

                      '.mantine-ScrollArea-viewport *:not(.mantine-Select-item)': {
                        backgroundColor: theme.colors.greenGray[2],
                        padding: '0 !important',
                      },
                    },
                    item: {
                      borderRadius: 12,
                      height: 36,
                      padding: '7px 12px',
                      backgroundColor: theme.colors.greenGray[2],
                      '&[data-selected]': {
                        color: theme.colors.emeraldGreen[0],
                        backgroundColor: theme.colors.mustardGreen[0],
                        '&, &:hover': {
                          backgroundColor: theme.colors.mustardGreen[0],
                        },
                      },
                      '&[data-hovered]': {
                        backgroundColor: theme.colors.mustardGreen[0],
                      },
                    },
                  }),
                },
                ScrollArea: {
                  styles: (theme) => ({
                    root: {
                      backgroundColor: 'transparent',
                    },
                    viewport: {
                      borderRadius: '7px',
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
      <Analytics />
    </>
  );
}

export default _App;
