import { SafeToken } from '@contractTypes/contracts';

import SafeTokenAbi from '../artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useSafeTokenContract = () =>
  useContract<SafeToken>(chainConfig.addresses.safe, SafeTokenAbi.abi, true);
export default useSafeTokenContract;
