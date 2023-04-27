import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from '@ethersproject/constants';
import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  Box,
  createStyles,
  Flex,
  Group,
  Image,
  NumberInput,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { NATIVE_TOKEN, NATIVE_TOKEN_ADDRESS, SUPPORTED_NETWORKS } from '@utils/constants';
import { useWeb3React } from '@web3-react/core';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';
import { AdjustmentsHorizontal, SwitchVertical } from 'tabler-icons-react';

import { executeContractHandler } from '../../handlers/executeContractHandler';
import useRouterContract from '../../hooks/useRouterContract';
import useSafeTokenContract from '../../hooks/useSafeTokenContract';
import useSwap from '../../hooks/useSwap';
import useTokenAllowance from '../../hooks/useTokenAllowance';
import useTokenBalances from '../../hooks/useTokenBalances';
import useTokenContract from '../../hooks/useTokenContract';
import { useSafeTokens, useTokens } from '../../hooks/useTokens';
import useUsdcAllowance from '../../hooks/useUsdcAllowance';
import useUsdcBalance from '../../hooks/useUsdcBalance';
import useUsdcContract from '../../hooks/useUsdcContract';
import { transactionInProgressAtom } from '../Account/Account';
import { FancyButton } from '../FancyButton';
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
      width: '538px',
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
        ':disabled': {
          color: theme.colors.limeGreen[1],
        },
      },
    },
    maxButton: {
      color: 'white',
      cursor: 'pointer',
      '&:hover': {
        color: 'orange',
      },
    },
    selectDropdown: {
      width: '400px',
    },
    chevron: {
      color: theme.colors.emeraldGreen[0],
    },
    rate: {
      fontSize: '14px',
      fontWeight: 500,
      color: 'white',
      marginLeft: '4px',
      '&:hover': {
        color: 'orange',
      },
    },
    switchButton: {
      color: 'white',
      backgroundColor: theme.colors.gray[0],
      borderRadius: '50%',
      padding: '0.5rem',
      cursor: 'pointer',
      '&:hover': {
        color: 'orange',
      },
    },
    kyberLogo: {
      color: 'white',
    },
  };
});

function calculateGasMargin(value: BigNumber): BigNumber {
  const defaultGasLimitMargin = BigNumber.from(20_000);
  const gasMargin = value.mul(BigNumber.from(2000)).div(BigNumber.from(10000));

  return gasMargin.gte(defaultGasLimitMargin)
    ? value.add(gasMargin)
    : value.add(defaultGasLimitMargin);
}

const SwapWidget = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [showModal, setShowModal] = useState<ModalType | null>(null);
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 42161;

  const tokensExternalList = useTokens();
  const tokensSafeList = useSafeTokens();

  const allTokens = [...tokensExternalList, ...tokensSafeList];

  const feeSetting = {
    feeAmount: 500,
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
    inputAmount,
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
  const [inverseRate, setInverseRate] = useState(false);
  const { balances, refetch } = useTokenBalances();
  //
  // useEffect(() => {
  //   refetch();
  // }, []);

  const usdc = useUsdcContract();
  const routerContract = useRouterContract();
  const tokenInContract = useTokenContract(tokenIn);
  const router = process.env.NEXT_PUBLIC_SAFE_ROUTER_ADDRESS || '';

  const [directionToSafe, setDirectionToSafe] = useState<boolean>(true);

  const { chainId: connectedChainId, account, provider } = useWeb3React();
  const isUnsupported =
    connectedChainId && !SUPPORTED_NETWORKS.includes(connectedChainId.toString());

  const trade = isUnsupported ? null : routeTrade;

  const tokenInInfo =
    tokenIn === NATIVE_TOKEN_ADDRESS
      ? NATIVE_TOKEN[chainId]
      : allTokens.find((item) => item.address === tokenIn);

  const tokenOutInfo =
    tokenOut === NATIVE_TOKEN_ADDRESS
      ? NATIVE_TOKEN[chainId]
      : allTokens.find((item) => item.address === tokenOut);

  const amountOut = trade?.outputAmount
    ? formatUnits(trade.outputAmount, tokenOutInfo?.decimals).toString()
    : '';

  let minAmountOut = '';

  if (amountOut) {
    minAmountOut = (Number(amountOut) * (1 - slippage / 10_000)).toPrecision(10).toString();
  }

  const tokenInBalance = balances[tokenIn] || BigNumber.from(0);
  const tokenOutBalance = balances[tokenOut] || BigNumber.from(0);

  const tokenInWithUnit = formatUnits(tokenInBalance, tokenInInfo?.decimals || 6);
  const tokenOutWithUnit = formatUnits(tokenOutBalance, tokenOutInfo?.decimals || 6);
  const rate =
    trade?.inputAmount &&
    trade?.outputAmount &&
    parseFloat(formatUnits(trade.outputAmount, tokenOutInfo?.decimals || 6)) /
      parseFloat(inputAmount);

  const handleChangeTokenIn = (address: string) => {
    if (address === tokenOut) setTokenOut(tokenIn);
    setTokenIn(address);
    setShowModal(null);
  };
  const handleChangeTokenOut = (address: string) => {
    setTokenOut(address);
    setShowModal(null);
  };

  const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);
  const safeContract = useSafeTokenContract();
  const usdcAllowance = useUsdcAllowance(safeContract?.address)?.data;
  const tokenAllowance = useTokenAllowance(tokenIn, router)?.data;
  const tokenInAllowance =
    tokenIn.toUpperCase() == usdc?.address.toUpperCase() ? usdcAllowance : tokenAllowance;
  const usdcBalance = useUsdcBalance()?.data;

  const contractsLoaded = connectedChainId == chainId && !!usdcBalance && !!tokenInAllowance;

  const enoughBalance = contractsLoaded && parseFloat(tokenInWithUnit) >= parseFloat(inputAmount);
  const enoughAllowance = contractsLoaded && Number(tokenInAllowance) >= Number(inputAmount);

  const buySafeHandler = () =>
    tokenInAllowance &&
    safeContract &&
    executeContractHandler(setExecutionInProgress, () =>
      safeContract.buySafeForExactAmountOfUSD(parseUnits(inputAmount, 6)),
    );
  const sellSafeHandler = () =>
    tokenInAllowance &&
    safeContract &&
    executeContractHandler(setExecutionInProgress, () =>
      safeContract.sellExactAmountOfSafe(parseUnits(inputAmount, 6)),
    );

  const buyWithKyberHandler = () =>
    account &&
    provider &&
    tokenInAllowance &&
    trade &&
    trade.encodedSwapData &&
    routerContract &&
    executeContractHandler(
      setExecutionInProgress,
      () =>
        provider.getSigner().sendTransaction({
          from: account,
          to: trade.routerAddress,
          data: trade.encodedSwapData,
        }),
      // routerContract.proxyAndBuy(trade.encodedSwapData),
    );
  const sellWithKyberHandler = () =>
    tokenInAllowance &&
    trade &&
    trade.encodedSwapData &&
    routerContract &&
    executeContractHandler(setExecutionInProgress, () =>
      routerContract.sellAndProxy(trade.encodedSwapData, trade.inputAmount),
    );

  const approveSpendTokenInForSafeHandler = () =>
    tokenInAllowance &&
    safeContract &&
    tokenInContract &&
    executeContractHandler(setExecutionInProgress, () =>
      tokenInContract.approve(
        tokenIn.toUpperCase() == usdc?.address.toUpperCase() ? safeContract.address : router,
        MaxUint256,
      ),
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
          <Text className={classes.balanceHeader}>
            Balance: {parseFloat(tokenInWithUnit).toFixed(5)}
          </Text>
        </Box>
        <Box className={classes.inputRow}>
          <NumberInput
            type={'number'}
            className={classes.input}
            value={parseFloat(inputAmount)}
            precision={5}
            min={1}
            removeTrailingZeros
            hideControls
            onChange={(value) => value && setInputAmount(value.toString())}
          />
          <Flex gap='xs' justify='right' align='center'>
            <Text className={classes.maxButton} onClick={() => setInputAmount(tokenInWithUnit)}>
              Max.
            </Text>
            <SelectToken
              selectedTokenAddress={tokenIn}
              onChange={handleChangeTokenIn}
              safeList={!directionToSafe}
              style={{ width: '220px' }}
            />
          </Flex>
        </Box>
      </Box>
      <Group noWrap position={'apart'} align={'center'}>
        <Group noWrap position={'left'} align={'center'} style={{ margin: '1rem' }}>
          <RefreshBtn
            loading={loading || executionInProgress}
            onRefresh={() => {
              getRate();
            }}
            trade={trade}
          />
          <Text className={classes.rate} onClick={() => rate && setInverseRate((prev) => !prev)}>
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
            setDirectionToSafe(!directionToSafe);
            setTrade(null);
            setTokenIn(tokenOut);
            setTokenOut(tokenIn);
            setInputAmount(amountOut);
          }}
        />
      </Group>
      <Box className={classes.inputWrapper}>
        <Box className={classes.balanceRow}>
          <Text className={classes.balanceHeader}>To</Text>
          <Text className={classes.balanceHeader}>
            Balance: {parseFloat(tokenOutWithUnit).toPrecision(10)}
          </Text>
        </Box>
        <Box className={classes.inputRow}>
          <NumberInput
            disabled
            className={classes.input}
            value={+Number(amountOut).toPrecision(10)}
            precision={5}
            min={0}
            removeTrailingZeros
            hideControls
            display={amountOut}
          />
          <Flex gap='xs' justify='right' align='center'>
            <SelectToken
              selectedTokenAddress={tokenOut}
              onChange={handleChangeTokenOut}
              safeList={directionToSafe}
              style={{ width: '220px' }}
            />
          </Flex>
        </Box>
      </Box>

      <FancyButton
        mt={'20px'}
        style={{ height: '50px', fontSize: '20px', fontWeight: 700 }}
        fullWidth
        loading={executionInProgress}
        disabled={executionInProgress || !enoughBalance || !contractsLoaded}
        onClick={() =>
          directionToSafe
            ? !enoughAllowance
              ? approveSpendTokenInForSafeHandler()
              : tokenIn.toUpperCase() === usdc?.address.toUpperCase()
              ? buySafeHandler()
              : buyWithKyberHandler()
            : tokenOut.toUpperCase() === usdc?.address.toUpperCase()
            ? sellSafeHandler()
            : sellWithKyberHandler()
        }
      >
        {!contractsLoaded
          ? 'Connect Wallet'
          : !enoughBalance
          ? 'No balance'
          : !enoughAllowance
          ? 'Approve'
          : 'Swap'}
      </FancyButton>
      <Link href={'https://kyberswap.com/swap/eth-usdc'} target={'_blank'}>
        <Group
          align={'center'}
          position={'center'}
          style={{
            fontSize: '12px',
            cursor: 'pointer',
          }}
          mt={'20px'}
        >
          Buy USDC with
          <Image
            src='/assets/kyberswap.svg'
            alt='Kyberswap'
            m={0}
            width={'70px'}
            className={classes.kyberLogo}
          />
        </Group>
      </Link>
    </Box>
  );
};
export default SwapWidget;
