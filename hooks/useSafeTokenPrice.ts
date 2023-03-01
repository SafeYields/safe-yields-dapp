import { SafeToken } from '@contractTypes/contracts';
import { fromWeiToString } from '@utils/web3utils';
import useSWR from 'swr';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSWRDataLiveAsBlocksArrive';

const useSafeTokenPrice = (suspense = false) => {
  const safeTokenContract = useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi);
  const shouldFetch = !!safeTokenContract;
  const result = useSWR(
    shouldFetch ? ['TokenBalance'] : null,
    async () => {
      return safeTokenContract ? fromWeiToString(await safeTokenContract.price(), 6) : null;
    },
    {
      suspense,
    },
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
};

export default useSafeTokenPrice;
