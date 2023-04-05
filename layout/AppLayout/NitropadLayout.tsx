import { ActionIcon, AppShell, Box, CloseButton, Drawer, MantineProvider, MediaQuery } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FancyBackground } from 'components/FancyBackground';
import type { CustomLayout } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
// @ts-ignore
import { Menu2 } from 'tabler-icons-react';

import { LayoutErrorBoundary } from '../LayoutErrorBoundary';
import { HeaderNav } from './HeaderNav';
import { SideNav } from './SideNav';

// const HeaderNav = dynamic(async () => {
//   const { HeaderNav } = await import('./HeaderNav');
//   return HeaderNav;
// });

// const SideNav = dynamic(async () => {
//   const { SideNav } = await import('./SideNav');
//   return SideNav;
// });


export const NitropadLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <FancyBackground>
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
            orange: ['#CBFB45', '#B8E747'],
            white: ['#F2ECE4'],
            greenGray: ['#36676A'],
            almostWhite: ['#F5F5F5'],
            veryDarkGreen: ['#0B1B03'],
          },
          components: {
            Button: {
              styles: {
                label: {
                  color: '#0B1B03',
                }
              },
              defaultProps: {
                color: 'veryDarkGreen',
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
                  background: 'linear-gradient(180deg, rgba(242, 236, 228, 0) 0%, rgba(242, 236, 228, 0) 49%, rgba(242, 236, 228, 0.1) 50%, rgba(242, 236, 228, 0.4)75%, rgba(242, 236, 228, 0.1) 100%), url("/assets/nft-modal-background.png") top/cover no-repeat',
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
                }
              })
            }
          }
        }}>
      <AppShell
        padding='md'
        styles={(theme) => ({
          body: {
            minHeight: '100vh',
            maxWidth: '100vw',
            overflowX: 'hidden',
            // background: 'url(/assets/background.jpg) fixed',
            backgroundImage: 'url(/assets/nitropad_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          main: {
            padding: 0,
          },
        })}
        navbar={
          <>
            <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
              <SideNav />
            </MediaQuery>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <DrawerNav opened={opened} handleClose={handlers.close} />
            </MediaQuery>
          </>
        }
        header={<HeaderNav
          left={
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <ActionIcon variant='default' radius='xl' size={40} onClick={handlers.open}>
                <Menu2 />
              </ActionIcon>
            </MediaQuery>
          }
        />}
      >
        <Box py='xs' px='md' sx={{ marginTop: '130px' }}>
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </Box>
      </AppShell>
      </MantineProvider>
    </FancyBackground>
  );
};

const DrawerNav: FC<{ opened: boolean; handleClose: () => void }> = ({ opened, handleClose }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', handleClose);
    return () => {
      router.events.off('routeChangeStart', handleClose);
    };
  }, [handleClose, router.events]);

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      size='auto'
      withCloseButton={false}
      sx={{ position: 'relative' }}
    >
      <CloseButton
        size='xl'
        radius='xl'
        variant='transparent'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          zIndex: 999,
          top: 8,
          right: -56,
          color: 'white',
          '&:not(:disabled):active': { transform: 'none' },
        }}
      />
      <SideNav />
    </Drawer>
  );
};
