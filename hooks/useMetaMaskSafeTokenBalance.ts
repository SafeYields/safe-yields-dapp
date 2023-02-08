import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';
import useMetamaskSafeTokenContract from './useMetamaskSafeTokenContract';

export default function useMetaMaskSafeTokenBalance(
  suspense = false,
) {
  const contract = useMetamaskSafeTokenContract();

  const shouldFetch = !!contract;

  const result = useSWR(
    shouldFetch ? ['TokenBalance'] : null,
    async () => {
      const address = await contract?.signer?.getAddress();
      const balance = address ? await contract?.balanceOf(address) : undefined;
      return address && balance !== undefined ? fromWeiToString(balance) : null;
    },
    {
      suspense,
    },
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
