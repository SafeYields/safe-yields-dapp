import { Button, createStyles } from '@mantine/core';
import { ButtonProps } from '@mantine/core/lib/Button/Button';
import { FC, MouseEventHandler } from 'react';

const useStyles = createStyles<string>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    outline: {
      ...theme.fn.focusStyles(),
      fontSize: theme.fontSizes.md,
      color: 'white',
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
      lineHeight: '18px',
      fontWeight: 325,
      border: '1px solid',
      background: 'none',
      borderColor: theme.colors.mainCyan[0],

      '&:hover': {
        boxShadow: '0 0px 8px 0 #4CFAC7',
        background: 'none',
        fontWeight: 700,
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
    },
  };
});

export const OulineButton: FC<
  ButtonProps & {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  }
> = ({ children, ...restProps }) => {
  const { classes, cx } = useStyles();
  return (
    <Button className={cx(classes.outline)} variant='light' radius='xl' size='md' {...restProps}>
      {children}
    </Button>
  );
};
