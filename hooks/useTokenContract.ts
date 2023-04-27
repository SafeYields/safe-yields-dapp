import { IERC20 } from '@contractTypes/@openzeppelin/contracts/token/ERC20';

import ERC20Abi from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import useContract from './useContract';

const useTokenContract = (address: string) => useContract<IERC20>(address, ERC20Abi.abi, true);
export default useTokenContract;
