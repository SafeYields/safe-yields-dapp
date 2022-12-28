import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { isAddress } from 'ethers/lib/utils';
import { useMemo } from 'react';

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
): T | null {
  const { provider, account, chainId } = useWeb3React();
  console.log('useContract: address: ', address);
  return useMemo(() => {
    if (!address || !ABI || !isAddress(address) || !provider || !chainId) {
      return null;
    }
    try {
      return new Contract(address, ABI, account ? provider.getSigner().connectUnchecked() : provider);
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
  }, [address, ABI, provider, account]) as T;
};
