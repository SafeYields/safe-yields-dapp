import { SafeToken } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';
import useNetworkBlockNumber from './useNetworkBlockNumber';
import useSafeTokenPrice from './useSafeTokenPrice';

const blocksInMonth = 1;
// const blocksInMonth = 60 * 60 * 24 * 30 / 13;

const useSafeTokenAPR = () => {
  const safeTokenContract = useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi);
  const { data: currentBlock } = useNetworkBlockNumber();
  const { data: currentPrice } = useSafeTokenPrice();
  return useSWR(
    'useSafePrice',
    async () => {
      if (!safeTokenContract || !currentBlock || !currentPrice || isNaN(Number(currentBlock)) || isNaN(Number(currentPrice))) {
        return null;
      }
      const priceMonthAgo = parseBalance(await safeTokenContract.price({ blockTag: Number(currentBlock) - blocksInMonth }),6);
      const priceChange = parseFloat(currentPrice) - parseFloat(priceMonthAgo);
      if (priceChange <= 0)
        return null;
      return (priceChange * 100 * 12 / parseFloat(priceMonthAgo)).toFixed(2);
    },
  );
};

export default useSafeTokenAPR;
