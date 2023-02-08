import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useNFTContract from './useNFTContract';

const useNFTRewards = (suspense = false) => {
  const safeNFTContract = useNFTContract();
  const shouldFetch = !!safeNFTContract;
  const result = useSWR(
    shouldFetch ? ['useNFTRewards'] : null,
    async () => safeNFTContract ? fromWeiToString(await safeNFTContract.getMyPendingRewardsTotal()) : null,
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useNFTRewards;
