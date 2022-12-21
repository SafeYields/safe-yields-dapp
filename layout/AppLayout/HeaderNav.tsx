import {
  ActionIcon,
  Burger, Container, createStyles,
  Group,
  Header,
  Indicator,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';
import { Account } from 'components/Account';
import useEagerConnect from 'hooks/useEagerConnect';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import {
  Bell,
  Home,
  Moneybag,
  UserCircle,
} from 'tabler-icons-react';
import { getPath } from 'utils';


const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
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
    backgroundColor: theme.colors.veryDarkGreen[0],

    '&:hover': {
      color: theme.colors.highlightGreen[0],
    },
  },

  linkActive: {
    // '&, &:hover': {
    //   color: theme.colors.highlightGreen[0]
    // },
  },
}));


export const HeaderNav: FC<{ left: ReactNode }> = ({ left }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const links = [
    { link: getPath('WHITEPAPER'), label: 'Whitepaper', Icon: Home },
    { link: getPath('SAFE'), label: 'Buy Safe', Icon: Moneybag },
    { link: getPath('NFT'), label: 'Buy NFT', Icon: UserCircle },
  ];

  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={{ base: 50, md: 70 }} p='md' mb={120}
            sx={(theme) => ({
              padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
              borderBottom: `1px solid ${theme.colors.veryDarkGreen[0]}`,
              backgroundColor: theme.colors.veryDarkGreen[0],
            })}
    >
      <Container className={classes.header}>
        <Group spacing={50} className={classes.links}>
          {left}
          {items}
          <Account triedToEagerConnect={triedToEagerConnect} />
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
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
