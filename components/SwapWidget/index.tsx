import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import {
  Box,
  createStyles,
  Flex,
  Group,
  NumberInput,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { NATIVE_TOKEN, NATIVE_TOKEN_ADDRESS, SUPPORTED_NETWORKS } from '@utils/constants';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { AdjustmentsHorizontal, SwitchVertical } from 'tabler-icons-react';

import useSwap from '../../hooks/useSwap';
import useTokenBalances from '../../hooks/useTokenBalances';
import { useTokens } from '../../hooks/useTokens';
import RefreshBtn from '../RefreshBtn';
import SelectToken from '../SelectToken';

enum ModalType {
  SETTING = 'setting',
  CURRENCY_IN = 'currency_in',
  CURRENCY_OUT = 'currency_out',
  REVIEW = 'review',
  DEXES_SETTING = 'dexes_setting',
  IMPORT_TOKEN = 'import_token',
}

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    wrapper: {
      position: 'absolute',
      top: '140px',
      borderRadius: '21px',
      padding: '27px',
      width: '638px',
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
    rate: {
      fontSize: '14px',
      fontWeight: 500,
      color: 'white',
      marginLeft: '4px',
    },
    switchButton: {
      color: 'white',
      backgroundColor: theme.colors.gray[0],
      borderRadius: '50%',
      padding: '0.5rem',
      pointer: 'cursor',
    },
  };
});

const SwapWidget = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [showModal, setShowModal] = useState<ModalType | null>(null);
  const { chainId } = useWeb3React();
  const isUnsupported = !chainId || !SUPPORTED_NETWORKS.includes(chainId.toString());

  const tokens = useTokens();
  const handleChangeTokenIn = (address: string) => {
    setTokenIn(address);
    setShowModal(null);
  };
  const feeSetting = {
    feeAmount: 0,
    isInBps: true,
    chargeFeeBy: 'currency_in' as 'currency_in' | 'currency_out',
    feeReceiver:
      process.env.NEXT_PUBLIC_FEE_RECEIVER || '0xca086A28753a0826733D53A7e674011307e027d8',
  };

  const {
    loading,
    error,
    tokenIn,
    tokenOut,
    setTokenIn,
    setTokenOut,
    inputAmout,
    setInputAmount,
    trade: routeTrade,
    slippage,
    setSlippage,
    getRate,
    deadline,
    setDeadline,
    allDexes,
    excludedDexes,
    setExcludedDexes,
    setTrade,
  } = useSwap({ feeSetting });

  const trade = isUnsupported ? null : routeTrade;

  const [inverseRate, setInverseRate] = useState(false);
  const { balances, refetch } = useTokenBalances(tokens.map((item) => item.address));

  const tokenInInfo =
    tokenIn === NATIVE_TOKEN_ADDRESS && chainId
      ? NATIVE_TOKEN[chainId]
      : tokens.find((item) => item.address === tokenIn);

  const tokenOutInfo =
    tokenOut === NATIVE_TOKEN_ADDRESS && chainId
      ? NATIVE_TOKEN[chainId]
      : tokens.find((item) => item.address === tokenOut);

  const amountOut = trade?.outputAmount
    ? formatUnits(trade.outputAmount, tokenOutInfo?.decimals).toString()
    : '';

  let minAmountOut = '';

  if (amountOut) {
    minAmountOut = (Number(amountOut) * (1 - slippage / 10_000)).toPrecision(8).toString();
  }

  const tokenInBalance = balances[tokenIn] || BigNumber.from(0);
  const tokenOutBalance = balances[tokenOut] || BigNumber.from(0);

  const tokenInWithUnit = formatUnits(tokenInBalance, tokenInInfo?.decimals || 18);
  const tokenOutWithUnit = formatUnits(tokenOutBalance, tokenOutInfo?.decimals || 18);
  const rate =
    trade?.inputAmount &&
    trade?.outputAmount &&
    parseFloat(formatUnits(trade.outputAmount, tokenOutInfo?.decimals || 18)) /
      parseFloat(inputAmout);

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
          <Text className={classes.balanceHeader}>Balance: {tokenInWithUnit}</Text>
        </Box>
        <Box className={classes.inputRow}>
          <NumberInput
            className={classes.input}
            defaultValue={0}
            precision={5}
            min={0}
            removeTrailingZeros
            hideControls
          />
          <Flex gap='xs' justify='center' align='center' style={{ width: '600px' }}>
            <Text className={classes.maxButton}>Max.</Text>
            <SelectToken selectedToken={tokenIn} onChange={handleChangeTokenIn} />
          </Flex>
        </Box>
      </Box>
      <Group noWrap position={'apart'} align={'center'}>
        <Group noWrap position={'left'} align={'center'} style={{ margin: '1rem' }}>
          <RefreshBtn
            loading={loading}
            onRefresh={() => {
              getRate();
            }}
            trade={trade}
          />
          <Text className={classes.rate}>
            {(() => {
              if (!rate) return '--';
              return !inverseRate
                ? `1 ${tokenInInfo?.symbol} = ${+rate.toPrecision(10)} ${tokenOutInfo?.symbol}`
                : `1 ${tokenOutInfo?.symbol} = ${+(1 / rate).toPrecision(10)} ${
                    tokenInInfo?.symbol
                  }`;
            })()}
          </Text>
        </Group>
        <SwitchVertical
          size={'36px'}
          className={classes.switchButton}
          onClick={() => {
            setTrade(null);
            setTokenIn(tokenOut);
            setTokenOut(tokenIn);
          }}
        />
      </Group>
    </Box>
  );
};
export default SwapWidget;
