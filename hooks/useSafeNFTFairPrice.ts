import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useNFTContract from './useNFTContract';

const useSafeNFTFairPrice = () => {
  const safeNFTContract = useNFTContract();
  return useSWR(
    'useSafeNFT',
    async () => safeNFTContract ? (await safeNFTContract.getFairPriceTable()).map(value => fromWeiToString(value,6)) : null,
  );
};

export default useSafeNFTFairPrice;
