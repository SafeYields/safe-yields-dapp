import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

export default function useNetworkBlockNumber() {
  const { provider } = useWeb3React();

  return useSWR(
    provider ? ['BlockNumber'] : null,
    () => provider?.getBlock('latest'),
    {
      refreshInterval: 3 * 1000,
    },
  );
}
