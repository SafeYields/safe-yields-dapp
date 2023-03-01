import { SafeNFT } from '@contractTypes/contracts';

import SafeNFTAbi from '../artifacts/contracts/SafeNFT.sol/SafeNFT.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useNFTContract = () => useContract<SafeNFT>(chainConfig.addresses.nft, SafeNFTAbi.abi, true);
export default useNFTContract;
