import { Contract } from '@ethersproject/contracts';
import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { isAddress } from 'ethers/lib/utils';
import { useEffect, useMemo } from 'react';


export default function useContract<T extends Contract = Contract>(
  hooks: Web3ReactHooks,
  connector: Connector,
  address: string,
  ABI: any,
): T | null {
  const { useChainId, useIsActive, useProvider } = hooks;
  useEffect(() => {
    void connector.activate()?.catch(() => {
      console.error('Failed to connect to network');
    });
  }, []);
  const chainId = useChainId();
  const isActive = useIsActive();
  const provider = useProvider();

  return useMemo(() => {

    if (!address || !ABI || !isAddress(address) || !isActive || !provider || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, provider.getSigner());
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
  }, [address, ABI, connector]) as T;
};
