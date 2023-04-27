import { fromWeiToString } from '@utils/web3utils';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useTokenContract from './useTokenContract';

const useTokenAllowance = (token: string, spender?: string, suspense = false) => {
  const { account } = useWeb3React();
  const tokenContract = useTokenContract(token);
  const shouldFetch = !!tokenContract;
  const result = useSWR(
    shouldFetch && account ? [`${token}_allowance`] : null,
    async () => {
      const address = await tokenContract?.signer?.getAddress();
      const allowance =
        address && account && spender ? await tokenContract?.allowance(account, spender) : null;
      return address && allowance ? fromWeiToString(allowance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useTokenAllowance;
