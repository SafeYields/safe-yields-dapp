import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useNFTContract from './useNFTContract';

const useSafeNFTTotalSupply = () => {
  const safeNFTContract = useNFTContract();
  return useSWR(
    'useSafeNFTTotalSupply',
    async () => safeNFTContract ?
      Promise.all([0, 1, 2, 3].map(tier => safeNFTContract.totalSupply(tier)))
        .then(values => values.map(value => fromWeiToString(value, 0))) : null,
  );
};

export default useSafeNFTTotalSupply;
