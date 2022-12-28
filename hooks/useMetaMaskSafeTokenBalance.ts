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
    () => contract?.balanceOf(contract?.signer?.getAddress()),
    {
      suspense,
    },
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
