import { Button, createStyles } from '@mantine/core';
import { ButtonProps } from '@mantine/core/lib/Button/Button';
import { FC, MouseEventHandler } from 'react';

const useStyles = createStyles<string>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    button: {
      ...theme.fn.focusStyles(),
      // height: '24px',
      justifyContent: 'center',
      display: 'flex',
      overflow: 'visible',
      margin: 'auto',
      padding: `0px ${theme.spacing.sm}px`,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: 'white',
      lineHeight: '16.8px',
      fontWeight: 400,
      border: 'none',
      backgroundSize: '300% 100%',
      backgroundImage: theme.fn.linearGradient(
        90,
        theme.colors.mainCyan[0],
        theme.colors.darkGreen[0],
        theme.colors.mainCyan[0],
        theme.colors.darkGreen[0],
      ),
      borderRadius: '50px',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        color: 'black',
      },

      '&:hover': {
        boxShadow: '0 0 8px 0 #4CFAC7',
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

export const FancyButton: FC<
  ButtonProps & {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  }
> = ({ children, ...restProps }) => {
  const { classes, cx } = useStyles();
  return (
    <Button
      className={cx(classes.button, classes.buttonActive)}
      variant='light'
      radius='xl'
      size='sm'
      {...restProps}
    >
      {children}
    </Button>
  );
};
