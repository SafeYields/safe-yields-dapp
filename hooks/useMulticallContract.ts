import { useWeb3React } from '@web3-react/core';
import { multicallABI } from 'multicall';
import { MULTICALL_ADDRESS, ZERO_ADDRESS } from 'utils/constants';

import useContract from './useContract';

const useMulticallContract = () => {
  const { chainId } = useWeb3React();
  return useContract(chainId ? MULTICALL_ADDRESS[chainId] : ZERO_ADDRESS, multicallABI);
};
export default useMulticallContract;
