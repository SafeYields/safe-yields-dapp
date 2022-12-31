import { SafeToken } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useSafeTokenPrice = () => {
  const safeTokenContract = useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi);
  return useSWR(
    'useSafePrice',
    async () => {
      console.debug(`useSWR: Fetching Safe Price, safeTokenContract: ${JSON.stringify(safeTokenContract?.address?.toString())}`);
      const price = safeTokenContract ? parseBalance(await safeTokenContract.price()) : null;
      console.debug(`useSWR: Fetched Safe Price: ${price}`);
      return price;
    },
    {
      refreshInterval: 10 * 1000,
    },
  );
};

export default useSafeTokenPrice;
