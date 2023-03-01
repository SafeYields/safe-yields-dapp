import { SafeToken } from '@contractTypes/contracts';
import { fromWeiToString } from '@utils/web3utils';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

const useSafeTokenBalance = (suspense = false) => {
  const safeTokenContract = useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi);
  const { account } = useWeb3React();
  const shouldFetch = !!safeTokenContract && !!account && !!safeTokenContract;
  const result = useSWR(
    shouldFetch ? ['SafeTokenBalance'] : null,
    async () => {
      const balance = account ? await safeTokenContract?.balanceOf(account) : undefined;
      return balance !== undefined ? fromWeiToString(balance) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useSafeTokenBalance;
