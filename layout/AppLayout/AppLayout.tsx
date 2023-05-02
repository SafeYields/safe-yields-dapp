import {
  ActionIcon,
  AppShell,
  Box,
  Drawer,
  MediaQuery,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FancyBackground } from 'components/FancyBackground';
import type { CustomLayout } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
// @ts-ignore
import { Menu2 } from 'tabler-icons-react';

import { Account } from '../../components/Account';
import { SafeYieldsLogo } from '../../components/SafeYieldsLogo';
import { LayoutErrorBoundary } from '../LayoutErrorBoundary';
import { HeaderNav } from './HeaderNav';
import { SideNav } from './SideNav';

export const AppLayout: CustomLayout = (page) => {
  const [opened, handlers] = useDisclosure(false);
  const theme = useMantineTheme();
  const mobileScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
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
            opened={opened}
            toggle={handlers.toggle}
          />
        }
      >
        <Box py='xs' px='md' sx={{ marginTop: mobileScreen ? 0 : '170px' }}>
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Stack spacing={'xs'}>
              <Account />
              <SafeYieldsLogo />
            </Stack>
          </MediaQuery>
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
