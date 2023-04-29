import { ActionIcon, AppShell, Box, CloseButton, Drawer, MediaQuery } from '@mantine/core';
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

export const AppLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <FancyBackground>
      <AppShell
        padding='md'
        styles={(theme) => ({
          body: {
            height: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
            backgroundImage: 'url(/assets/background.png)',
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
        header={
          <HeaderNav
            left={
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <ActionIcon variant='default' radius='xl' size={40} onClick={handlers.open}>
                  <Menu2 />
                </ActionIcon>
              </MediaQuery>
            }
          />
        }
      >
        <Box py='xs' px='md' sx={{ marginTop: '170px' }}>
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
    <>
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
    </>
  );
};
