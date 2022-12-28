import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import useNetworkSafeTokenContract from './useNetworkSafeTokenContract';

const useNetworkSafeTokenPrice = () => {
  const safeTokenContract = useNetworkSafeTokenContract();
  return useSWR(
    'useSafePrice',
    async () => {
      console.debug(`useSWR: Fetching Safe Price, safeTokenContract: ${JSON.stringify(safeTokenContract?.address?.toString())}`);
      const price = safeTokenContract ? parseBalance(await safeTokenContract.price()) : null;
      console.debug(`useSWR: Fetched Safe Price: ${price}`);
      return price;
    },
    {
      refreshInterval: 1 * 1000,
    },
  );
};

export default useNetworkSafeTokenPrice;
