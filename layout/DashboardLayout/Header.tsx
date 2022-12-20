import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Box,
  Divider,
  Group,
  Indicator,
  Menu,
} from '@mantine/core';
import { NextLink } from '@mantine/next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { Bell, Logout, Search, Settings } from 'tabler-icons-react';
import { getPath } from 'utils';

export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  return (
    <Box
      component='header'
      sx={(theme) => ({
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderBottom: `0px solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.colors.veryDarkGreen[0]
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

  return (
    <Menu
      position='bottom'
      transition='pop-top-right'
      styles={(theme) => ({
        label: { fontSize: theme.fontSizes.sm },
        itemLabel: { fontSize: theme.fontSizes.md },
      })}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={16} />} component={NextLink} href='#'>
        <ActionIcon variant='default' radius='xl' size={40}>
          <Avatar
            src='https://img.icons8.com/ios/512/metamask-logo.png'
            radius='xl'
          />
        </ActionIcon>
      </Menu.Item>
      <Divider />
      <Menu.Item icon={<Logout size={16} />} onClick={signOut}>
        Wallet
      </Menu.Item>
    </Menu>
  );
};
