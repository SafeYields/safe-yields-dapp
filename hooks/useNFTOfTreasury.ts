import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useNFTContract from './useNFTContract';

const useNFTOfTreasury = () => {
  const safeNFTContract = useNFTContract();
  return useSWR('getMyShareOfTreasury', async () =>
    safeNFTContract ? fromWeiToString(await safeNFTContract.getMyShareOfTreasury()) : null,
  );
};

export default useNFTOfTreasury;
