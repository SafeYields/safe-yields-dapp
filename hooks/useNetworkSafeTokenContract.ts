import { hooksNetwork, network } from '@utils/connectors';
import SafeTokenAbi from 'artifacts/contracts/SafeToken.sol/SafeToken.json';
import { chainConfig } from 'config';
import type { SafeToken } from 'types/contracts/SafeToken';

import useContract from './useContract';


export default function useNetworkSafeTokenContract(): SafeToken | null {
  return useContract<SafeToken>(hooksNetwork, network, chainConfig.addresses.safe, SafeTokenAbi.abi);
}

