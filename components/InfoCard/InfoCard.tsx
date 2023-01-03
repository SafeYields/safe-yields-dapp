import { Box, createStyles, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type InfoCardProps = {
  children: ReactNode;
  header: string;
  displayCondition?: boolean;
}

export const InfoCard: FC<InfoCardProps> = ({ children, header, displayCondition = true }) => {

    const useStyles = createStyles<string>((theme, params, getRef) => {
        return {
          card: {
            ...theme.fn.focusStyles(),
            margin: 'auto',
            textAlign: 'center',
            columnGap: theme.spacing.sm,
            textDecoration: 'none',
            fontSize: theme.fontSizes.md,
            color: theme.colors[theme.primaryColor][0],
            padding: '0',
            lineHeight: '18px',
            fontWeight: 325,
            borderRadius: '30px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
            boxSizing: 'border-box',
            // background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),

            background: theme.fn.linearGradient(90, theme.colors.mustardGreen[0], theme.colors.orange[0]),
            // background: 'transparent',
            boxShadow: 'none',
            mozTransition: 'all 0.4s ease-in-out',
            oTransition: 'all 0.4s ease-in-out',
            webkitTransition: 'all 0.4s ease-in-out',
            transition: 'all 0.4s ease-in-out',
            willChange: 'transform',

            '&:hover': {
              boxShadow: '0 7px 15px 0 rgba(229, 66, 10, 0.50)',
              mozTransition: 'all 0.4s ease-in-out',
              oTransition: 'all 0.4s ease-in-out',
              webkitTransition: 'all 0.4s ease-in-out',
              transition: 'all 0.4s ease-in-out',
            },

          },
          cardInner: {
            ...theme.fn.focusStyles(),
            minWidth: '250px',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            textAlign: 'center',
            columnGap: theme.spacing.sm,
            textDecoration: 'none',
            fontSize: theme.fontSizes.md,
            color: theme.colors[theme.primaryColor][0],
            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            lineHeight: '18px',
            fontWeight: 325,
            borderRadius: '30px',
            borderWidth: '2px',
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
            fontWeight: '400',
            fontSize: '24px',
            position: 'absolute',
            top: '-20px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderRadius: '10px',
            background: 'transparent',
          },
        };
      },
    );
    const { classes, cx } = useStyles();
    return (
      <>
        {displayCondition && (
          <Box className={classes.card}>
            <Box className={classes.cardInner}>
              <Text className={classes.cardHeader}>{header}</Text>
              {children}
            </Box>
          </Box>
        )
        }
      </>
    );
  }
;
