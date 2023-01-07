import { SafeToken } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

const useSafeTokenBalance = (suspense = false) => {
  const safeTokenContract = useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi);
  const shouldFetch = !!safeTokenContract;
  const result = useSWR(
    shouldFetch ? ['TokenBalance'] : null,
    async () => {
      const address = await safeTokenContract?.signer?.getAddress();
      const balance = address ? await safeTokenContract?.balanceOf(address) : undefined;
      return address && balance !== undefined ? parseBalance(balance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useSafeTokenBalance;
