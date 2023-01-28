import { Button, createStyles } from '@mantine/core';
import { ButtonProps } from '@mantine/core/lib/Button/Button';
import { FC } from 'react';
import { hooksMetamask } from 'utils/connectors';


const { useChainId, useAccount, useIsActivating, useIsActive, useProvider, useENSName } = hooksMetamask;


const useStyles = createStyles<string>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    button: {
      ...theme.fn.focusStyles(),
      height: '24px',
      display: 'flex',
      overflow: 'visible',
      margin: 'auto',
      padding: `0px ${theme.spacing.sm}px`,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors[theme.primaryColor][0],
      lineHeight: '16.8px',
      fontWeight: 400,
      border: 'none',
      backgroundSize: '300% 100%',
      backgroundImage: theme.fn.linearGradient(90, theme.colors.mustardGreen[0], theme.colors.orange[0], theme.colors.mustardGreen[0], theme.colors.orange[0]),

      borderRadius: '50px',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',

      '&:hover': {
        boxShadow: '0 1px 2px 0 rgba(229, 66, 10, 0.85)',
        backgroundPosition: '100% 0',
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
      '&:focus': {
        outline: 'none',
      },
    },
  };
});

export const FancyButton: FC<ButtonProps> = ({ children, ...restProps }) => {
  const { classes, cx } = useStyles();
  return (
    <Button className={cx(classes.button, classes.buttonActive)}
            variant='light'
            radius='xl'
            size='sm'
            {...restProps}
    >
      {children}
    </Button>
  );
};
