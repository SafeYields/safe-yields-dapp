import {
  ActionIcon,
  Autocomplete,
  Box,
  Group,
  Indicator,
  Menu,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useWeb3React } from '@web3-react/core';
import { Account } from 'components/Account';
import useEagerConnect from 'hooks/useEagerConnect';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { Bell, Search, Settings } from 'tabler-icons-react';
import { getPath } from 'utils';

export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  return (
    <Box
      component='header'
      sx={(theme) => ({
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderBottom: `0px solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.colors.veryDarkGreen[0],
      })}
    >
      <Group spacing='lg' noWrap>
        {left}
        <UserMenu />
      </Group>
    </Box>
  );
};

const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size='lg'
      placeholder='Search'
      icon={<Search size={18} />}
      styles={{
        root: { flexGrow: 1 },
        input: { border: 0, backgroundColor: 'transparent' },
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
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

const UserMenu: FC = () => {
  const router = useRouter();
  const signOut = () => {
    router.push(getPath('SIGN_IN'));
  };

  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  return (
    <Menu
      position='bottom'
      transition='pop-top-right'
      styles={(theme) => ({
        label: { fontSize: theme.fontSizes.sm },
        itemLabel: { fontSize: theme.fontSizes.md },
      })}
    >
      <Menu.Item icon={<Settings size={16} />} component={NextLink} href='#'>
        <Account triedToEagerConnect={triedToEagerConnect} />
      </Menu.Item>
    </Menu>
  );
};
