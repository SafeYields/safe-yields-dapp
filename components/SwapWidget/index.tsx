import { Box, createStyles, Flex, Input, Select, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { AdjustmentsHorizontal, CaretDown } from 'tabler-icons-react';

enum ModalType {
  SETTING = 'setting',
  CURRENCY_IN = 'currency_in',
  CURRENCY_OUT = 'currency_out',
  REVIEW = 'review',
  DEXES_SETTING = 'dexes_setting',
  IMPORT_TOKEN = 'import_token',
}

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
      titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.25rem',
        fontWeight: 500,
        alignItems: 'center',
      },
      settings: {
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          color: 'orange',
        },
      },
      inputWrapper: {
        borderRadius: '7px',
        padding: '0.75rem',
        background: theme.colors.gray[0],
        marginTop: '1rem',
      },
      balanceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      balanceHeader: {
        marginLeft: '12px',
        color: theme.colors.emeraldGreen[0],
      },
      inputRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.75rem',
      },
      input: {
        input: {
          background: 'transparent',
          border: 'none',
          color: theme.colors.limeGreen[1],
          fontWeight: 700,
          fontSize: '20px',
        },
      },
      maxButton: {
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          color: 'orange',
        },
      },
      chevron: {
        color: theme.colors.emeraldGreen[0],
      },
    };
  });
  const { classes, cx } = useStyles();
  const [showModal, setShowModal] = useState<ModalType | null>(null);

  // const {
  //   loading,
  //   error,
  //   tokenIn,
  //   tokenOut,
  //   setTokenIn,
  //   setTokenOut,
  //   inputAmout,
  //   setInputAmount,
  //   trade: routeTrade,
  //   slippage,
  //   setSlippage,
  //   getRate,
  //   deadline,
  //   setDeadline,
  //   allDexes,
  //   excludedDexes,
  //   setExcludedDexes,
  //   setTrade,
  // } = useSwap();

  const formattedTokenInBalance = parseFloat(
    parseFloat('21412.4275467564473632024').toPrecision(10),
  );
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.titleRow}>
        <Title order={3}>Swap</Title>
        <AdjustmentsHorizontal
          className={classes.settings}
          onClick={() => setShowModal(ModalType.SETTING)}
        />
      </Box>
      <Box className={classes.inputWrapper}>
        <Box className={classes.balanceRow}>
          <Text className={classes.balanceHeader}>From</Text>
          <Text className={classes.balanceHeader}>Balance: {formattedTokenInBalance}</Text>
        </Box>
        <Box className={classes.inputRow}>
          <Input className={classes.input} />
          <Flex gap='xs' justify='center' align='center'>
            <Text className={classes.maxButton}>Max.</Text>
            <Select
              size='lg'
              w={'7 0%'}
              rightSection={<CaretDown className={classes.chevron} />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={[
                { value: 'Eth', label: 'Eth' },
                { value: 'USDC', label: 'USDC' },
                { value: 'USDT', label: 'USDT' },
                { value: 'USDs', label: 'USDs' },
              ]}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default SwapWidget;
