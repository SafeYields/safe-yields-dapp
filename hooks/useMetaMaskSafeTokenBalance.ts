import { parseBalance } from '@utils/web3utils';
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
      const balance = await contract?.balanceOf(address);
      return address && balance ? parseBalance(balance) : null;
    },
    {
      suspense,
    },
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
