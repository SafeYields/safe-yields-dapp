import { IERC20 } from '@contractTypes/@openzeppelin/contracts/token/ERC20';

import ERC20Abi from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { chainConfig } from '../config';
import useContract from './useContract';

const useUsdcContract = () => useContract<IERC20>(chainConfig.addresses.usdc, ERC20Abi.abi, true);
export default useUsdcContract;
