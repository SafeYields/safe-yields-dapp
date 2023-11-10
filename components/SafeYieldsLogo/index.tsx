import { Box, createStyles, Image } from '@mantine/core';
import { BoxProps } from '@mantine/core/lib/Box/Box';
import { getPath } from '@utils/path';
import Link from 'next/link';
import { FC } from 'react';

const useStyles = createStyles<string, { collapsed?: boolean }>((theme, params, getRef) => {
  return {
    safeYieldsLogo: {
      paddingRight: theme.spacing.xs,
      [theme.fn.largerThan('sm')]: {
        paddingTop: 15,
        paddingBottom: 15,
      },
      margin: 'auto',
      width: params?.collapsed ? 90 : 210,
      height: 'auto',
    },

    logo: {
      cursor: 'pointer',
      borderRadius: '100%',
      background: 'transparent',
      '&:hover': {
        opacity: 0.95,
      },
    },
  };
});

export const SafeYieldsLogo: FC<{ collapsed?: boolean } & BoxProps> = ({ collapsed, ...props }) => {
  const { classes, cx } = useStyles({ collapsed });
  return (
    <Box className={cx(classes.safeYieldsLogo, props.className)}>
      <Link href={getPath('HOME')}>
        <Image src='/assets/SY_logo.svg' alt='Safe Yields Logo' className={classes.logo} />
      </Link>
    </Box>
  );
};
