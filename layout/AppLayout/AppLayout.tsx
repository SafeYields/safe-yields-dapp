import { ActionIcon, AppShell, Box, CloseButton, createStyles, Drawer, MediaQuery } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { CustomLayout } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
// @ts-ignore
import { Menu2 } from 'tabler-icons-react';

import { FancyBackground } from '../../components/FancyBackground';
import { LayoutErrorBoundary } from '../LayoutErrorBoundary';

const HeaderNav = dynamic(async () => {
  const { HeaderNav } = await import('./HeaderNav');
  return HeaderNav;
});

const SideNav = dynamic(async () => {
  const { SideNav } = await import('./SideNav');
  return SideNav;
});


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


export const AppLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles();

  return (
    <FancyBackground>
      <AppShell
        padding='md'
        styles={(theme) => ({
          body: {
            minHeight: '100vh',
            maxWidth: '100vw',
            overflowX: 'hidden',
            background: 'url(/assets/background.jpg) fixed',
            // backgroundRepeat: 'no-repeat',
            // backgroundSize:'cover',
          },
          main: { padding: 0 },
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
