import { keyframes } from '@emotion/react';
import {
  createStyles,
  Group,
  Image,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
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

const glowing = keyframes`
  0% {
    filter: drop-shadow(0 0 5px #062C2D) drop-shadow(0 0 15px #062C2D) drop-shadow(0 0 20px #062C2D);
  }
  90% {
    filter: drop-shadow(0 0 5px #062C2D) drop-shadow(0 0 15px #062C2D) drop-shadow(0 0 20px #062C2D);
  }

  100% {
    filter: drop-shadow(0 0 20px #D1DE5D) drop-shadow(0 0 25px #D9E022) drop-shadow(0 0 40px #E89B17);
  }
`;

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
      backgroundColor: 'transparent',
      top: 0,
      borderColor: theme.colors.greenGray[0],
      borderWidth: '1px',
      width: params?.collapsed ? 120 : 315,
      transition: params?.collapsed ? 'width 0.1s linear' : 'none',
    },

    safeYieldsLogo: {
      paddingRight: theme.spacing.xs,
      paddingTop: 35,
      paddingBottom: 35,
      margin: 'auto',
      width: params?.collapsed ? 90 : 205,
      height: 170,
    },

    glowingLogo: {
      cursor: 'pointer',
      animationDelay: '10s',
      borderRadius: '100%',
      background: 'transparent',
      webkitAnimation: `${glowing} 30s ease-in-out infinite alternate`,
      animation: `${glowing} 30s ease-in-out infinite alternate`,
      mozAnimation: `${glowing} 30s ease-in-out infinite alternate`,
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
  if (process.env.NEXT_PUBLIC_PRESALE_IS_ACTIVE?.toLowerCase() === 'true') {
    return (
      <Navbar
        p='md'
        className={cx(classes.navbar, className)}
        style={{ borderWidth: '0px', position: 'absolute' }}
      >
        <Navbar.Section grow>
          <Group className={cx(classes.safeYieldsLogo)} position='apart'>
            <Link href={getPath('NFT')}>
              <Image
                src='/assets/safe-yields-logo.svg'
                alt='Safe Yields Logo'
                className={classes.glowingLogo}
              />
            </Link>
          </Group>
        </Navbar.Section>
      </Navbar>
    );
  } else
    return (
      <Navbar p='md' className={cx(classes.navbar, className)}>
        <Navbar.Section grow>
          <Group className={classes.safeYieldsLogo} position='apart'>
            <Link href={getPath('HOME')}>
              <Image
                src='/assets/safe-yields-logo.svg'
                alt='Safe Yields Logo'
                className={classes.glowingLogo}
              />
            </Link>
          </Group>
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
