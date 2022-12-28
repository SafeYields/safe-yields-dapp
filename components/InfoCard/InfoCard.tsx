import { Box, createStyles, Loader, Text } from '@mantine/core';
import { FC } from 'react';
import { SWRResponse } from 'swr';

type InfoCardProps = {
  header: string;
  feeder: () => SWRResponse;
}

export const InfoCard: FC<InfoCardProps> = ({ header, feeder }) => {

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
            // background: theme.colors.veryDarkGreen[0],

          },
          cardInner: {
            ...theme.fn.focusStyles(),
            minWidth: '250px',
            minHeight: '100px',
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

            background: theme.colors.veryDarkGreen[0],

          },

          cardHeader: {
            ...theme.fn.focusStyles(),
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '24px',
            position: 'absolute',
            top: '-12px',
            paddingLeft: '10px',
            paddingRight: '10px',
            background: theme.colors.veryDarkGreen[0],
          },
        };
      },
    );
    const { classes, cx } = useStyles();
    const feed = feeder();
    console.log(`infocard feed: ${JSON.stringify(feed)}`);
    return (
      <Box className={classes.card}>
        <Box className={classes.cardInner}>
          <Text className={classes.cardHeader}>{header}</Text>
          {feed.data ?
            <h1>{feed.data}</h1>
            :
            <Loader size='lg' color='green' />}
        </Box>
      </Box>
    );
  }
;
