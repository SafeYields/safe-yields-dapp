import { ActionIcon, Container, createStyles, Group, Header, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Account } from 'components/Account';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { Bell, Home, Moneybag, UserCircle } from 'tabler-icons-react';
import { ActiveLink, getPath } from 'utils';

import useWalletConnected from '../../hooks/useWalletConnected';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.lg,
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',
    lineHeight: '19px',
    backgroundColor: 'transparent',

    '&:hover': {
      color: theme.colors.highlightGreen[0],
    },
  },

  linkActive: {
    color: theme.colors.highlightGreen[0],
  },
}));

export const HeaderNav: FC<{ left: ReactNode }> = ({ left }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const links = [
    { link: getPath('WHITEPAPER'), label: 'Whitepaper', Icon: Home },
    { link: getPath('SAFE'), label: 'Buy Safe', Icon: Moneybag },
    { link: getPath('NFT'), label: 'Buy NFT', Icon: UserCircle },
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
    <Header
      height={{ base: 50, md: 70 }}
      p='sm'
      mb={120}
      mt={45}
      sx={(theme) => ({
        position: 'absolute',
        padding: `${theme.spacing.xs}px 0px`,
        borderBottom: `1px solid ${'transparent'}`,
        backgroundColor: 'transparent',
      })}
    >
      <Container className={classes.header}>
        <Group spacing={50} className={classes.links}>
          {left}
          {!injectedWalletConnected && items}
          <Account />
        </Group>
        {/* <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />*/}
      </Container>
    </Header>
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
