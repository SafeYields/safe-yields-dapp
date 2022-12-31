import { SafeNFT } from '@contractTypes/contracts';
import { parseBalance } from '@utils/web3utils';
import useSWR from 'swr';

import SafeNFTAbi from '../artifacts/contracts/SafeNFT.sol/SafeNFT.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useNFTOfTreasury = () => {
  const safeNFTContract = useContract<SafeNFT>(chainConfig.addresses.nft, SafeNFTAbi.abi);
  return useSWR(
    'useSafePrice',
    async () => safeNFTContract ? parseBalance(await safeNFTContract.getMyShareOfTreasury()) : null,
  );
};

export default useNFTOfTreasury;