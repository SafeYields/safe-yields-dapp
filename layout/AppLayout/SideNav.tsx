import { keyframes } from '@emotion/react';
import {
  createStyles,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CornerRightUp,
  FileReport,
  Home,
  LayoutDashboard,
  Moneybag,
  ReportMoney,
  Robot,
  UserCircle,
} from 'tabler-icons-react';
import { getPath } from 'utils';
// eslint-disable-next-line no-duplicate-imports
import { ActiveLink } from 'utils';

import { SafeYieldsLogo } from '../../components/SafeYieldsLogo';

const slide = keyframes`
  100% {
    left: 0;
  }
`;

const useStyles = createStyles<string, { collapsed?: boolean }>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    navbar: {
      position: 'sticky',
      [theme.fn.smallerThan('sm')]: {
        height: '100vh',
        backgroundColor: theme.colors.emeraldGreen[0],
        opacity: 0.9,
      },
      [theme.fn.largerThan('sm')]: {
        backgroundColor: 'transparent',
      },
      top: 0,
      borderColor: theme.colors.greenGray[0],
      borderWidth: '1px',
      width: params?.collapsed ? 120 : 315,
      transition: params?.collapsed ? 'width 0.1s linear' : 'none',
    },

    footer: {
      paddingTop: theme.spacing.xs,
      marginTop: theme.spacing.md,
    },

    collapse: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      marginLeft: params?.collapsed ? 13 : 25,
      alignItems: 'start',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      background: theme.colors.limeGreen[0],
      color: 'black',
      padding: '10px 10px',
      lineHeight: '18px',
      fontWeight: 325,
      borderRadius: '50px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      boxShadow: 'none',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',
      willChange: 'transform',

      '&:hover': {
        boxShadow: '0 2px 15px 0 rgba(200, 180, 80, 0.50)',
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
    },
    collapseIcon: {
      ref: icon,
      color: 'black',
    },

    link: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      margin: 'auto',
      marginBottom: 15,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: 'white',
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      lineHeight: '18px',
      fontWeight: 325,
      borderRadius: '50px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      position: 'relative',

      '&:hover': {
        borderRadius: '50px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme.colors.mustardGreen[0],
        background: 'transparent',
        // background: theme.colors.sideMenuBackgroundBlue[0],
      },
    },

    linkActive: {
      borderRadius: '50px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.colors.mustardGreen[0],
      [`& .${icon}`]: {
        color: theme.colors[theme.primaryColor][7],
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.almostWhite[0],
    },

    linkLabel: params?.collapsed ? { display: 'none' } : {},
  };
});

const ITEMS = [
  { href: getPath('WEBSITE'), label: 'Website', Icon: Home },
  { href: getPath('DASHBOARD'), label: 'Dashboard', Icon: LayoutDashboard },
  { href: getPath('YIELD'), label: 'Yield aggregator', Icon: ReportMoney, comingSoon: true },
  { href: getPath('EMMA'), label: 'Emma the trading Bot', Icon: Robot, comingSoon: true },
  { href: getPath('SAFE'), label: 'Trade Safe', Icon: Moneybag },
  { href: getPath('NFT'), label: 'Buy an NFT', Icon: UserCircle },
  {
    href: getPath('INVESTMENT'),
    label: 'Investment Pool Portfolio',
    Icon: CornerRightUp,
    comingSoon: true,
  },
  { href: getPath('EXPENSE'), label: 'Expense Log', Icon: FileReport, comingSoon: true },
];

export const SideNav: FC<{ className?: string }> = ({ className }) => {
  const [collapsed, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles({ collapsed });
  return (
    <Navbar p='md' className={cx(classes.navbar, className)}>
      <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
        <SafeYieldsLogo collapsed={collapsed} />
      </MediaQuery>
      <Navbar.Section grow>
        {ITEMS.map(({ label, href, Icon, comingSoon }) => (
          <Tooltip
            key={label}
            label={label}
            disabled={!collapsed}
            position='right'
            withArrow
            sx={{ width: '100%' }}
          >
            <ActiveLink href={href} passHref>
              {(isActive) => {
                return (
                  <a
                    className={cx(classes.link, {
                      [classes.linkActive]: isActive,
                    })}
                  >
                    <Icon className={classes.linkIcon} />
                    <Stack spacing={3} className={classes.linkLabel}>
                      <span className={classes.linkLabel}>{label}</span>
                      {comingSoon && <Text size={'xs'}>(Coming Soon)</Text>}
                    </Stack>
                  </a>
                );
              }}
            </ActiveLink>
          </Tooltip>
        ))}
      </Navbar.Section>

      <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
        <Navbar.Section className={classes.footer}>
          <UnstyledButton className={classes.collapse} onClick={handlers.toggle}>
            {collapsed ? (
              <ArrowRight className={classes.collapseIcon} />
            ) : (
              <>
                <ArrowLeft className={classes.collapseIcon} />
              </>
            )}
          </UnstyledButton>
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  );
};
