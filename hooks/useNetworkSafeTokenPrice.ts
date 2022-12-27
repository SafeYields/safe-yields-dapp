import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import useNetworkSafeTokenContract from './useNetworkSafeTokenContract';

const useNetworkSafeTokenPrice = () => {
  const safeTokenContract = useNetworkSafeTokenContract();

  return useSWR(
    'useSafePrice',
    async () => safeTokenContract ? parseBalance(await safeTokenContract.price()) : null,
    {
      refreshInterval: 1 * 1000,
    },
  );
};

export default useNetworkSafeTokenPrice;
