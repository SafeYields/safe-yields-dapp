import { Box, createStyles, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type CardContentBoxProps = {
  children: ReactNode;
  header: string;
  accent?: boolean;

}

export const CardContentBox: FC<CardContentBoxProps> = ({ children, header, displayCondition = true }) => {

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
            borderRadius: '21px',
            borderWidth: '0px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
            boxSizing: 'border-box',
            // background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),

            // background: theme.fn.linearGradient(180, 'rgba(217, 217, 217, 0.3) 0%', 'rgba(217, 217, 217, 0.3) 0.01%', 'rgba(217, 217, 217, 0.09) 100%'),
            background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(3px)',
      /* Note: backdrop-filter has minimal browser support */

            // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            // backdrop-filter: blur(3px);
            /* Note: backdrop-filter has minimal browser support */

            // border-radius: 21px;
            // background: 'transparent',
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
            // minWidth: '250px',
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
            fontWeight: '350',
            fontSize: '15px',
            lineHeight: '18px',
            position: 'absolute',
            color: theme.colors.almostWhite[0],
            top: '10px',
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
