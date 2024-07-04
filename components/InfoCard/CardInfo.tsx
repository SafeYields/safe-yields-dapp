import { Box, createStyles, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, ReactNode } from 'react';

type InfoCardProps = {
  children: ReactNode;
  header: ReactNode;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  background?: string;
  gray?: boolean;
  hover?: boolean;
};

export const CardInfo: FC<InfoCardProps> = ({
  children,
  header,
  minWidth,
  maxWidth,
  minHeight,
  background,
  gray,
  hover = true,
}) => {
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const useStyles = createStyles((theme) => ({
    card: {
      ...theme.fn.focusStyles(),
      maxWidth: isSmallScreen ? '100%' : maxWidth,
      minHeight: isSmallScreen ? 'auto' : minHeight,

      margin: '20px',
      marginBottom: '5px',
      columnGap: theme.spacing.sm,
      fontSize: theme.fontSizes.md,
      color: theme.colors[theme.primaryColor][0],
      padding: isSmallScreen ? '10px 20px' : '10px 50px',
      lineHeight: '18px',
      fontWeight: 325,
      borderRadius: '21px',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      backgroundClip: 'padding-box',
      position: 'relative',
      boxSizing: 'border-box',
      filter: gray && 'grayscale(100%)',
      background:
        'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      backdropFilter: 'blur(3px)',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',
      willChange: 'transform',
      '&:hover': hover
        ? {
            boxShadow: '0 7px 15px 0 #4CFAC770',
            mozTransition: 'all 0.4s ease-in-out',
            oTransition: 'all 0.4s ease-in-out',
            webkitTransition: 'all 0.4s ease-in-out',
            transition: 'all 0.4s ease-in-out',
          }
        : undefined,
    },
    cardInner: {
      ...theme.fn.focusStyles(),
      minWidth: isSmallScreen ? '100%' : '400px',
      display: 'flex',
      textDecoration: 'none',
      margin: '10px',
      backgroundClip: 'padding-box',
      position: 'relative',
      boxSizing: 'border-box',
    },
    cardHeader: {
      ...theme.fn.focusStyles(),
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 'xl',
      position: 'relative',

      color: 'white',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '0px',
      paddingBottom: '0px',
      borderRadius: '10px',
      margin: '0px 0px',
      background: 'transparent',
      textAlign: isSmallScreen ? 'center' : 'left',
    },
  }));
  const { classes } = useStyles();
  return (
    <Box className={classes.card} style={{ background }}>
      <Stack spacing={0} className={classes.cardInner}>
        <Text className={classes.cardHeader}>{header}</Text>
        {children}
      </Stack>
    </Box>
  );
};
