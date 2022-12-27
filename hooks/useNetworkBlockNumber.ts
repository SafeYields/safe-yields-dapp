import { hooksNetwork } from '@utils/connectors';
import useSWR from 'swr';

export default function useNetworkBlockNumber() {
  const { useProvider } = hooksNetwork;
  const provider = useProvider();

  return useSWR(
    provider ? ['BlockNumber'] : null,
    () => provider?.getBlock('latest'),
    {
      refreshInterval: 10 * 1000,
    },
  );
}
