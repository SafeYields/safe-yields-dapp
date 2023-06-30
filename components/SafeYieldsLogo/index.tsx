import { keyframes } from '@emotion/react';
import { Box, createStyles, Image } from '@mantine/core';
import { BoxProps } from '@mantine/core/lib/Box/Box';
import { getPath } from '@utils/path';
import Link from 'next/link';
import { FC } from 'react';

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

const useStyles = createStyles<string, { collapsed?: boolean }>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    safeYieldsLogo: {
      paddingRight: theme.spacing.xs,
      [theme.fn.largerThan('sm')]: {
        paddingTop: 15,
        paddingBottom: 15,
      },
      margin: 'auto',
      width: params?.collapsed ? 90 : 170,
      height: 'auto',
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
  };
});

export const SafeYieldsLogo: FC<{ collapsed?: boolean } & BoxProps> = ({ collapsed, ...props }) => {
  const { classes, cx } = useStyles({ collapsed });
  return (
    <Box className={cx(classes.safeYieldsLogo, props.className)}>
      <Link href={getPath('HOME')}>
        <Image
          src='/assets/safe-yields-logo.svg'
          alt='Safe Yields Logo'
          className={classes.glowingLogo}
        />
      </Link>
    </Box>
  );
};
