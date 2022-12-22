import ERC20_ABI from 'artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import type { IERC20 } from 'types/@openzeppelin/contracts/token/ERC20/IERC20';

import useContract from './useContract';

export default function useTokenContract(tokenAddress: string) {
  return useContract<IERC20>(tokenAddress, ERC20_ABI);
}

