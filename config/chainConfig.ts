import { AddEthereumChainParameter } from '@web3-react/types';

type ChainConfig =
  Record<number,
    {
      chainId: number;
      chainName: string;
      chainShortName: string;
      nativeCurrency: AddEthereumChainParameter['nativeCurrency'],
      rpcUrls: string[];
      blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'],
      addresses: {
        treasury: string;
        management: string;
        busd: string;
        safe: string;
        vault: string;
        nft: string;
      }
    }>;


const chainId = { mainnet: 56, testnet: 97 }[process.env.NETWORK || 'localhost'] || 1337;

const config: ChainConfig = {
  56: {
    chainName: 'Binance Smart Chain',
    chainId: 56,
    chainShortName: 'BSC',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com/'],
    addresses: {
      treasury: '',
      management: '',
      busd: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      safe: '',
      vault: '',
      nft: '',
    },
  },
  97:
    {
      chainName: 'Binance Smart Chain Testnet',
      chainId: 97,
      chainShortName: 'BSC',
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      nativeCurrency: {
        name: 'TBNB',
        symbol: 'TBNB',
        decimals: 18,
      },
      blockExplorerUrls: ['https://testnet.bscscan.com/'],
      addresses: {
        treasury: '0xBF89e2e63e471cC29Da80bcD661342A9935982A8',
        management: '0xf2c1FE530d9c1686950F33d1B47d8B9474D92965',
        busd: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
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
      rpcUrls: ['http://localhost:8545'],
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      blockExplorerUrls: [],
      addresses: {
        treasury: '0xBF89e2e63e471cC29Da80bcD661342A9935982A8',
        management: '0xf2c1FE530d9c1686950F33d1B47d8B9474D92965',
        busd: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
        safe: '0xF3c420B081422C51533150664Fc8F2fb77E39296',
        vault: '0x3Eca9FeB89C04F5B75bDAf72961f97B4D66fE68e',
        nft: '0x5735205Db896c63B97F9090b0A852682F4a5635B',
      },
    },
};

export const chainConfig = config[chainId];
export const urlMap = Object.fromEntries(Object.entries(config).map(([key, value]) => [value.chainId, value.rpcUrls]));
