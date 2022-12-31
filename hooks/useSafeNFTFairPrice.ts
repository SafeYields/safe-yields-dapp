import { SafeNFT } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeNFTAbi from '../artifacts/contracts/SafeNFT.sol/SafeNFT.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useSafeNFTFairPrice = () => {
  const safeNFTContract = useContract<SafeNFT>(chainConfig.addresses.nft, SafeNFTAbi.abi);
  return useSWR(
    'useSafeNFT',
    async () => {
        return safeNFTContract ? (await safeNFTContract.getFairPriceTable()).map(value => parseBalance(value)) : null;
    },
  );
};

export default useSafeNFTFairPrice;
