import { ActionIcon, AppShell, Box, CloseButton, Drawer, MediaQuery } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { CustomLayout } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Menu2 } from 'tabler-icons-react';

import { LayoutErrorBoundary } from '../LayoutErrorBoundary';

const HeaderNav = dynamic(async () => {
  const { HeaderNav } = await import('./HeaderNav');
  return HeaderNav;
});

const SideNav = dynamic(async () => {
  const { SideNav } = await import('./SideNav');
  return SideNav;
});

export const AppLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);

  return (
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
