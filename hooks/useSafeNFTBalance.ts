import { fromWeiToString } from '@utils/web3utils';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useNFTContract from './useNFTContract';

const useSafeNFTBalance = (suspense = false) => {
  const { account } = useWeb3React();
  const safeNFTContract = useNFTContract();
  const shouldFetch = !!safeNFTContract && !!account;
  const result = useSWR(
    shouldFetch ? ['SafeNFTBalance'] : null,
      async () => account ? (await safeNFTContract?.getBalanceTable(account))?.map(value => fromWeiToString(value,0,0)) : null,
      {
        suspense,
      },
    )
  ;
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
};

export default useSafeNFTBalance;
