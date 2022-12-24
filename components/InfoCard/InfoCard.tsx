import { Badge, Box, createStyles, Group, Stack, Text } from '@mantine/core';

import useSafePrice from '../../hooks/useSafePrice';

export const InfoCard = () => {

    const useStyles = createStyles<string>((theme, params, getRef) => {
        return {
          card: {
            ...theme.fn.focusStyles(),
            width: '500px',
            display: 'flex',
            margin: 'auto',
            alignItems: 'center',
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
            width: '500px',
            display: 'flex',
            margin: 'auto',
            alignItems: 'center',
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
            marginTop: '0',
            position: 'absolute',
            background: theme.colors.veryDarkGreen[0],
            alignSelf: 'flex-center',
          },
        };
      },
    );
    const { classes, cx } = useStyles();
    return (
      <Box className={classes.card}>
        <Box className={classes.cardInner}>
          <Stack>
            <Text className={classes.cardHeader}>Header</Text>
            {/* <Card.Section>*/}
            {/*  <Image*/}
            {/*    src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'*/}
            {/*    height={160}*/}
            {/*    alt='Norway'*/}
            {/*  />*/}
            {/* </Card.Section>*/}

            <Group position='apart' mt='md' mb='xs'>
              <Text weight={500}>Safe Yields Stats</Text>
              <Badge color='pink' variant='light'>
                {useSafePrice().data?}
              </Badge>
            </Group>

            <Text size='sm' color='dimmed'>
              Blockchains are a new technology that allows for the creation of decentralized applications.
            </Text>

          </Stack>
        </Box>
      </Box>
    );
  }
;
