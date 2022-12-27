import { hooksMetamask, metaMask } from '@utils/connectors';
import SafeTokenAbi from 'artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from 'config';
import type { SafeToken } from 'types/contracts/SafeToken';

import useContract from './useContract';


export default function useMetamaskSafeTokenContract(): SafeToken | null {
  return useContract<SafeToken>(hooksMetamask, metaMask, chainConfig.addresses.safe, SafeTokenAbi.abi);
}

