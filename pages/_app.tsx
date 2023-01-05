import { createStyles, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPageWithLayout } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { GlobalStyleProvider } from 'style/GlobalStyleProvider';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const Web3Provider = dynamic(() => import('components/Web3Provider/index'), { ssr: false });


const useStyles = createStyles<string>((theme, params, getRef) => {
    return {
      app: {
        '&-appear': {
          opacity: 0.01,
        },
        '&-appear-active': {
          opacity: 1,
          transition: 'opacity 0.5s ease-in',
        },
        '&-enter': {
          opacity: 0,
        },
        '&-enter-active': {
          opacity: 1,
          transition: 'opacity 300ms',
        },
        '&-exit': {
          opacity: 1,
        },
        '&-exit-active': {
          opacity: 0,
          transition: 'opacity 300ms',
        },

      },
    };
  },
);


function _App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getPageLayout = Component.getLayout || ((page) => page);
  const { classes, cx } = useStyles();
  return (
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
            <SwitchTransition mode='out-in'>
              <CSSTransition key={'start'} appear={true} classNames={classes.app} timeout={700}>
                {getPageLayout(<Component {...pageProps} />)}
              </CSSTransition>
            </SwitchTransition>
          </NotificationsProvider>
        </MantineProvider>
      </GlobalStyleProvider>
    </Web3Provider>
  );
}

export default _App;
