import { Box, createStyles, Title } from '@mantine/core';

const SwapWidget = () => {
  const useStyles = createStyles<string>((theme, params, getRef) => {
    return {
      wrapper: {
        position: 'absolute',
        top: '140px',
        borderRadius: '21px',
        padding: '27px',
        width: '438px',
        height: '515px',
        background:
          'linear-gradient(180deg, rgba(217, 217, 217, 0.32) 0%, rgba(217, 217, 217, 0.13) 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(3px)',
      },
    };
  });
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Title order={3}>Swap</Title>
    </Box>
  );
};
export default SwapWidget;
