import { useWeb3React } from '@web3-react/core';

import { supportedChainId } from '../config/chainConfig';

export default function useWalletConnected() {
  const { account, chainId } = useWeb3React();
  return (typeof account === 'string' && chainId && chainId === supportedChainId) || false;
}
