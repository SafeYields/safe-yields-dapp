import { AddEthereumChainParameter } from '@web3-react/types';

type ChainConfig = {
  chainId: number;
  chainName: string;
  chainShortName: string;
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'],
  rpcUrls: string[];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'],
  addresses: {
    treasury: string;
    management: string;
    usdc: string;
    safe: string;
    vault: string;
    nft: string;
  }
};

type ChainsConfig = Record<number, ChainConfig>;


const envChainId = process.env.NEXT_PUBLIC_CHAIN_ID;
if (envChainId === undefined) {
  throw new Error('CHAIN_ID is not defined');
}
export const supportedChainId = parseInt(envChainId, 10);

const config: ChainsConfig = {
  42161: {
    chainName: 'Arbitrum Mainnet',
    chainId: 42161,
    chainShortName: 'Arbitrum',
    rpcUrls: ['https://arb1.arbitrum.io/' || process.env.NEXT_PUBLIC_MAINNET_URL],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://arbiscan.com/'],
    addresses: {
      treasury: '',
      management: '',
      usdc: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      safe: '',
      vault: '',
      nft: '',
    },
  },
  421613:
    {
      chainName: 'Arbitrum Goerli Testnet',
      chainId: 421613,
      chainShortName: 'Goerli',
      rpcUrls: ['https://goerli-rollup.arbitrum.io/' || process.env.NEXT_PUBLIC_TESTNET_URL],
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://testnet.arbiscan.com/'],
      addresses: {
        treasury: '0xBF89e2e63e471cC29Da80bcD661342A9935982A8',
        management: '0xf2c1FE530d9c1686950F33d1B47d8B9474D92965',
        usdc: '0x179522635726710dd7d2035a81d856de4aa7836c',
        safe: '0xF3c420B081422C51533150664Fc8F2fb77E39296',
        vault: '0x3Eca9FeB89C04F5B75bDAf72961f97B4D66fE68e',
        nft: '0x5735205Db896c63B97F9090b0A852682F4a5635B',
      },
    },
  1337:
    {
      chainName: 'Localhost',
      chainId: 1337,
      chainShortName: 'HH',
      rpcUrls: ['http://127.0.0.1:8545/'],
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: [],
      addresses: {
        treasury: '0xBF89e2e63e471cC29Da80bcD661342A9935982A8',
        management: '0xf2c1FE530d9c1686950F33d1B47d8B9474D92965',
        usdc: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
        safe: '0xF3c420B081422C51533150664Fc8F2fb77E39296',
        vault: '0x3Eca9FeB89C04F5B75bDAf72961f97B4D66fE68e',
        nft: '0x5735205Db896c63B97F9090b0A852682F4a5635B',
      },
    },
};

export const chainConfig = config[supportedChainId];
export const urlMap = { [supportedChainId]: config[supportedChainId].rpcUrls };
