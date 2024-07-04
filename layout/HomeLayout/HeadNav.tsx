import {
  ActionIcon,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Indicator,
  Stack,
} from '@mantine/core';
import { Account } from 'components/Account';
import { SafeYieldsLogo } from 'components/SafeYieldsLogo';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { Bell, Home } from 'tabler-icons-react';
import { ActiveLink, getPath } from 'utils';

import useWalletConnected from '../../hooks/useWalletConnected';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    justifyContent: 'right',
    gap: '16px 40px',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    position: 'fixed',
    [theme.fn.largerThan(360)]: {
      top: 33,
    },
    [theme.fn.smallerThan(360)]: {
      top: 73,
    },
    right: 10,
    marginTop: -14, // Magic number to actually center align the burger menu
    zIndex: 1000,
  },

  mobileHeader: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    padding: '8px 12px',
    textShadow: '1px 1px 3px #000',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.lg,
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',
    lineHeight: '19px',
    backgroundColor: 'transparent',

    '&:hover': {
      color: theme.colors.mainCyan[0],
    },
  },

  linkActive: {
    color: theme.colors.mainCyan[0],
  },

  linkBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}));

export const HeadNav: FC<{
  left: ReactNode;
  opened: boolean;
  toggle: () => void;
  sideNavCollapsed?: boolean;
}> = ({ left, opened, toggle, sideNavCollapsed }) => {
  const links = [
    { link: getPath('WHITEPAPER'), label: 'Whitepaper', Icon: Home },
    { link: getPath('SAFE'), label: 'Buy Safe' },
  ];

  const [active, setActive] = useState(links[0].link);
  const injectedWalletConnected = useWalletConnected();
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <ActiveLink href={link.link} key={link.label} passHref>
      {(isActive) => (
        <a key={link.label} className={cx(classes.link, { [classes.linkActive]: isActive })}>
          {link.label}
        </a>
      )}
    </ActiveLink>
  ));

  return (
    <>
      <Header
        height={{ base: 50, md: 70 }}
        px='sm'
        pb={15}
        sx={(theme) => ({
          position: 'fixed',
          padding: `${theme.spacing.xs}px 0px`,
          borderBottom: `1px solid ${'transparent'}`,
          backgroundColor: 'transparent',
          top: 0,
          right: 0,
          [theme.fn.largerThan('sm')]: {
            paddingTop: 70,
            marginLeft: sideNavCollapsed ? 120 : 315,
          },
          [theme.fn.smallerThan('sm')]: {
            paddingTop: 0,
          },
        })}
      >
        <Container className={classes.header}>
          <Group className={classes.links}>
            {left}
            {!injectedWalletConnected && items}
            <Account />
          </Group>
          <Stack
            spacing={'xs'}
            className={classes.mobileHeader}
            pt={injectedWalletConnected ? 180 : 115}
          >
            <Account />
            <SafeYieldsLogo />
          </Stack>
        </Container>
      </Header>
      <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
    </>
  );
};

const Notification: FC = () => {
  return (
    <Indicator inline size={14} offset={4} color='red' withBorder>
      <Link href={getPath('NOTIFICATION')} passHref>
        <ActionIcon component='a' variant='default' radius='xl' size={40}>
          <Bell />
        </ActionIcon>
      </Link>
    </Indicator>
  );
};
