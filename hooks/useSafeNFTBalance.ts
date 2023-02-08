import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useNFTContract from './useNFTContract';

const useSafeNFTBalance = (suspense = false) => {
  const safeNFTContract = useNFTContract();
  const shouldFetch = !!safeNFTContract;
  const result = useSWR(
    shouldFetch ? ['SafeNFTBalance'] : null,
    async () => {
      const address = await safeNFTContract?.signer?.getAddress();
      return address ? (await safeNFTContract?.getBalanceTable(address))?.map(value => fromWeiToString(value)) : undefined;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useSafeNFTBalance;
