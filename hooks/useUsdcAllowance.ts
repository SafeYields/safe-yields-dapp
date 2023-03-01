import { fromWeiToString } from '@utils/web3utils';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useUsdcContract from './useUsdcContract';

const useUsdcAllowance = (spender?: string, suspense = false) => {
  const { account } = useWeb3React();
  const usdcContract = useUsdcContract();
  const shouldFetch = !!usdcContract;
  const result = useSWR(
    shouldFetch && account ? ['UsdcAllowance'] : null,
    async () => {
      const address = await usdcContract?.signer?.getAddress();
      const allowance = address && account && spender ? await usdcContract?.allowance(account, spender) : null;
      return address && allowance ? fromWeiToString(allowance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useUsdcAllowance;
