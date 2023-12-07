import { ActionIcon, AppShell, Box, Drawer, MediaQuery, useMantineTheme } from '@mantine/core';
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
  const [sideNavCollapsed, sideNavHandlers] = useDisclosure(false);

  const router = useRouter();

  const bgSuffix = router.pathname === '/' ? 'safeyields_bg' : 'safeyields_bg_dapp';

  return (
    <FancyBackground>
      <AppShell
        padding='md'
        styles={(theme) => ({
          body: {
            height: '100%',
            backgroundImage: `url(/assets/1920_1080_${bgSuffix}.png)`,
            [theme.fn.largerThan('md')]: {
              backgroundImage: `url(/assets/1440_900_${bgSuffix}.png)`,
            },
            [theme.fn.smallerThan('md')]: {
              backgroundImage: `url(/assets/810_1080_${bgSuffix}.png)`,
            },
            [theme.fn.smallerThan('sm')]: {
              backgroundImage: `url(/assets/768_1024_${bgSuffix}.png)`,
            },
            [theme.fn.smallerThan('xs')]: {
              backgroundImage: `url(/assets/360_640_${bgSuffix}.png)`,
            },
            backgroundSize: '100% 100vh',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            WebkitMaskAttachment: 'fixed',
            backgroundColor: '#000505',
          },
          main: {
            padding: 0,
          },
        })}
        navbar={
          <>
            <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
              <SideNav collapsed={sideNavCollapsed} toggle={sideNavHandlers.toggle} />
            </MediaQuery>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <DrawerNav opened={opened} handleClose={handlers.close} />
            </MediaQuery>
          </>
        }
        header={
          <HeaderNav
            sideNavCollapsed={sideNavCollapsed}
            left={
              <MediaQuery
                largerThan='sm'
                styles={{ display: 'none', position: 'sticky', top: 0, left: 0 }}
              >
                <ActionIcon variant='default' radius='xl' size={40} onClick={handlers.open}>
                  <Menu2 />
                </ActionIcon>
              </MediaQuery>
            }
            opened={opened}
            toggle={handlers.toggle}
          />
        }
      >
        <Box py='xs' px='md'>
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
      withOverlay
      opened={opened}
      onClose={handleClose}
      size='auto'
      withCloseButton={false}
      overlayBlur={3}
      overlayOpacity={0.3}
      overlayColor={useMantineTheme().colors.emeraldGreen[0]}
      transitionDuration={300}
      transition={'slide-right'}
      transitionTimingFunction={opened ? 'ease-in' : 'ease-out'}
    >
      <SideNav />
    </Drawer>
  );
};
