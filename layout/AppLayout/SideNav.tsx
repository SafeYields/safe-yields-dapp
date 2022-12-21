import { createStyles, Group, Image, MediaQuery, Navbar, Tooltip, UnstyledButton } from '@mantine/core';
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

const useStyles = createStyles<string, { collapsed?: boolean }>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    navbar: {
      position: 'sticky',
      backgroundColor: theme.colors.veryDarkGreen[0],
      top: 0,
      width: params?.collapsed ? 120 : 315,
      transition: params?.collapsed ? 'width 0.1s linear' : 'none',
    },

    header: {
      paddingBottom: theme.spacing.xs,
      marginBottom: theme.spacing.md,
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
    },

    footer: {
      paddingTop: theme.spacing.xs,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colors.gray[2]}`,
    },

    logo: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 700,
    },

    link: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      margin: 'auto',
      marginBottom: 2,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors[theme.primaryColor][0],
      padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
      lineHeight: '18px',
      fontWeight: 325,
      borderRadius: '50px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      backgroundClip: 'padding-box',
      position: 'relative',
      boxSizing: 'border-box',
      background: theme.colors.veryDarkGreen[0],

      '&:hover': {
        borderRadius: '50px',
        borderWidth: '2px',
        borderStyle: 'solid',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
          margin: '-4px',
          borderRadius: 'inherit',
          background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),
        },
      },
    },

    linkActive: {
      '&, &:hover': {
        // background: 'transparent',
        background: theme.colors.veryDarkGreen[0],
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
          margin: '-4px',
          borderRadius: 'inherit',
          background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),
        },
        // borderRadius: '50px',
        // borderWidth: '2px',
        // borderStyle: 'solid',
        // borderColor: theme.colors[theme.primaryColor][0],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][7],
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.gray[3],
    },

    linkLabel: params?.collapsed ? { display: 'none' } : {},
  };
});

const ITEMS = [
  { href: getPath('HOME'), label: 'Website', Icon: Home },
  { href: getPath('DASHBOARD'), label: 'Dashboard', Icon: LayoutDashboard },
  { href: getPath('YIELD'), label: 'Yield aggregator', Icon: ReportMoney },
  { href: getPath('EMMA'), label: 'Emma the trading Bot', Icon: Robot },
  { href: getPath('SAFE'), label: 'Trade Safe', Icon: Moneybag },
  { href: getPath('NFT'), label: 'Buy an NFT', Icon: UserCircle },
  { href: getPath('INVESTMENT'), label: 'Investment Pool Portfolio', Icon: CornerRightUp },
  { href: getPath('EXPENSE'), label: 'Expense Log', Icon: FileReport },
];

export const SideNav: FC<{ className?: string }> = ({ className }) => {
  const [collapsed, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles({ collapsed });

  return (
    <Navbar p='md' className={cx(classes.navbar, className)}>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Link href={getPath('HOME')}>
            <Image
              src='/assets/safe-yields-logo.svg'
              alt='Safe Yields Logo'
            />
          </Link>
        </Group>
        {ITEMS.map(({ label, href, Icon }) => (
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
                    <span className={classes.linkLabel}>{label}</span>
                  </a>
                );
              }}
                </ActiveLink>
                </Tooltip>
                ))}
            </Navbar.Section>

            <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
              <Navbar.Section className={classes.footer}>
                <UnstyledButton className={classes.link} onClick={handlers.toggle}>
                  {collapsed ? (
                    <ArrowRight className={classes.linkIcon} />
                  ) : (
                    <>
                      <ArrowLeft className={classes.linkIcon} />
                    </>
                  )}
                </UnstyledButton>
              </Navbar.Section>
            </MediaQuery>
          </Navbar>
        );
        };
