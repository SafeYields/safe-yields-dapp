import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import { erc20Interface } from 'multicall';
import { useCallback, useEffect, useState } from 'react';
import { NATIVE_TOKEN_ADDRESS } from 'utils/constants';

import useMulticalContract from './useMulticallContract';
import { useSafeTokens, useTokens } from './useTokens';

const useTokenBalances = () => {
  const tokensExternalList = useTokens();
  const tokensSafeList = useSafeTokens();

  const allTokens = [...tokensExternalList, ...tokensSafeList];

  const tokenAddresses = allTokens.map((token) => token.address);
  const { provider, chainId, account } = useWeb3React();
  const multicallContract = useMulticalContract();
  const [balances, setBalances] = useState<{ [address: string]: BigNumber }>({});
  const [loading, setLoading] = useState(false);

  const fetchBalances = useCallback(async () => {
    if (!provider || !account) {
      setBalances({});
      return;
    }
    try {
      setLoading(true);
      const nativeBalance = await provider.getBalance(account);

      const fragment = erc20Interface.getFunction('balanceOf');
      const callData = erc20Interface.encodeFunctionData(fragment, [account]);

      const chunks = tokenAddresses.map((address) => ({
        target: address,
        callData,
      }));

      const res = await multicallContract?.callStatic.tryBlockAndAggregate(false, chunks);
      const balances = res.returnData.map((item: any) => {
        return erc20Interface.decodeFunctionResult(fragment, item.returnData);
      });
      setLoading(false);

      setBalances({
        [NATIVE_TOKEN_ADDRESS]: nativeBalance,
        ...balances.reduce(
          (acc: { [address: string]: BigNumber }, item: { balance: BigNumber }, index: number) => {
            return {
              ...acc,
              [tokenAddresses[index]]: item.balance,
            };
          },
          {} as { [address: string]: BigNumber },
        ),
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [provider, chainId, JSON.stringify(tokenAddresses)]);

  useEffect(() => {
    fetchBalances();

    const i = setInterval(() => {
      fetchBalances();
    }, 10_000);

    return () => {
      clearInterval(i);
    };
  }, [provider, fetchBalances]);

  return {
    loading,
    balances,
    refetch: fetchBalances,
  };
};

export default useTokenBalances;
