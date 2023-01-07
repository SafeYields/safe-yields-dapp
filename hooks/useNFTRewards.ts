import { SafeNFT } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeNFTAbi from '../artifacts/contracts/SafeNFT.sol/SafeNFT.json';
import { chainConfig } from '../config';
import useContract from './useContract';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

const useNFTRewards = (suspense = false) => {
  const safeNFTContract = useContract<SafeNFT>(chainConfig.addresses.nft, SafeNFTAbi.abi);
  const shouldFetch = !!safeNFTContract;
  const result = useSWR(
    shouldFetch ? ['useNFTRewards'] : null,
    async () => safeNFTContract ? parseBalance(await safeNFTContract.getMyPendingRewardsTotal()) : null,
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useNFTRewards;
