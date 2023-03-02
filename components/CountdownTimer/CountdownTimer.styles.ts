import { createStyles } from '@mantine/core';

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    container: {
      marginTop: '20px',
      // display: 'flex',
      // flexDirection: 'column',
      // margin: '0 1.4vw',
      // width: '80px',
    },
    number: {
      margin: '0 1.4vw',
      fontWeight: 700,
      fontSize: '36px',
      color: theme.colors.orange[1]
    },
    label: {
      marginTop: '10px',
      fontSize: 'md',
      color: 'white',
    },
  };
});
export default useStyles;

