import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useNFTContract from './useNFTContract';

const useSafeNFTBuyPrice = () => {
  const safeNFTContract = useNFTContract();
  return useSWR(
    'useSafeNFT',
    async () => safeNFTContract ? (await safeNFTContract.getPriceTable()).map(value => fromWeiToString(value,6)) : null,
  );
};

export default useSafeNFTBuyPrice;
