import { Box, createStyles, Stack, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type InfoCardProps = {
  children: ReactNode;
  header: ReactNode;
  maxWidth?: string;

  background?: string;
}

export const InfoCard: FC<InfoCardProps> = ({ children, header, maxWidth, background }) => {

  const useStyles = createStyles<string>((theme, params, getRef) => {
      return {
        card: {
          ...theme.fn.focusStyles(),
          maxWidth,
         zIndex: 7,
        margin: 'auto',
          marginBottom: '13px',
          textAlign: 'center',
          columnGap: theme.spacing.sm,
          textDecoration: 'none',
          fontSize: theme.fontSizes.md,
          color: theme.colors[theme.primaryColor][0],
          padding: '0',
          lineHeight: '18px',
          fontWeight: 325,
          borderRadius: '21px',
          borderWidth: '0px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          backgroundClip: 'padding-box',
          position: 'relative',
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(3px)',
          mozTransition: 'all 0.4s ease-in-out',
          oTransition: 'all 0.4s ease-in-out',
          webkitTransition: 'all 0.4s ease-in-out',
          transition: 'all 0.4s ease-in-out',
          willChange: 'transform',

          '&:hover': {
            boxShadow: '0 7px 15px 0 rgba(200, 180, 80, 0.50)',
            mozTransition: 'all 0.4s ease-in-out',
            oTransition: 'all 0.4s ease-in-out',
            webkitTransition: 'all 0.4s ease-in-out',
            transition: 'all 0.4s ease-in-out',
          },

        },
        cardInner: {
          ...theme.fn.focusStyles(),
          minWidth: '170px',
          minHeight: '138px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          textAlign: 'center',
          columnGap: theme.spacing.sm,
          textDecoration: 'none',
          color: theme.colors.limeGreen[0],
          padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
          borderRadius: '21px',
          borderWidth: '0px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          backgroundClip: 'padding-box',
          position: 'relative',
          boxSizing: 'border-box',
          // background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),

          background: 'transparent',

        },

        cardHeader: {
          ...theme.fn.focusStyles(),
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: 'lg',
          position: 'relative',
          color: theme.colors.almostWhite[0],
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '0px',
          paddingBottom: '0px',
          borderRadius: '10px',
          margin: '0px 0px',
          background: 'transparent',
        },
      };
    },
  );
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.card} style={{ background }}>
      <Stack spacing={0} className={classes.cardInner}>
        <Text className={classes.cardHeader}>{header}</Text>
        {children}
      </Stack>
    </Box>
  );
};
