import { fromWeiToString } from '@utils/web3utils';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useUsdcContract from './useUsdcContract';

const useUsdcBalance = (suspense = false) => {
  const { account } = useWeb3React();
  const usdcContract = useUsdcContract();
  const shouldFetch = !!usdcContract;
  const result = useSWR(
    shouldFetch && account ? ['UsdcBalance'] : null,
    async () => {
      const balance = account ? await usdcContract?.balanceOf(account) : undefined;
      return balance !== undefined ? fromWeiToString(balance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
};

export default useUsdcBalance;
