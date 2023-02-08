import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useUsdcContract from './useUsdcContract';

const useUsdcBalance = (suspense = false) => {
  const usdcContract = useUsdcContract();
  const shouldFetch = !!usdcContract;
  const result = useSWR(
    shouldFetch ? ['UsdcBalance'] : null,
    async () => {
      const address = await usdcContract?.signer?.getAddress();
      const balance = address ? await usdcContract?.balanceOf(address) : undefined;
      return address && balance !== undefined ? fromWeiToString(balance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useUsdcBalance;
