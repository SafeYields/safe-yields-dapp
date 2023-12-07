import { createStyles } from '@mantine/core';

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    button: {
      ...theme.fn.focusStyles(),
      marginLeft: '20px',
      minWidth: '220px',
      display: 'flex',
      margin: 'auto',
      marginBottom: 2,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: '#040A01',
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
      lineHeight: '18px',
      fontWeight: 325,
      border: 'none',
      backgroundSize: '300% 100%',
      backgroundColor: '#4CFAC7',
      // backgroundImage: theme.fn.linearGradient(
      //   90,
      //   theme.colors.mainCyan[0],
      //   theme.colors.darkGreen[0],
      //   theme.colors.mainCyan[0],
      //   theme.colors.darkGreen[0],
      // ),
      borderRadius: '50px',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',

      '&:hover': {
        boxShadow: '0 0px 8px 0 #4CFAC7',
        // backgroundPosition: '100% 0',
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
      '&:focus': {
        outline: 'none',
      },
    },

    buttonActive: {
      boxShadow: '0 0px 8px 0 #4CFAC7',
    },

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
        boxShadow: '0 5px 15px 0 #4CFAC7',
        background: 'none',
        fontWeight: 700,
        borderColor: theme.colors.mainCyan[0],
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
    },
  };
});

export default useStyles;
