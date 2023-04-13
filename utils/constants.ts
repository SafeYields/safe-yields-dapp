import arbitrumTokens from './tokens';

export enum ZIndex {
  UNDERLAYER = -1,
  OVERLAY = 100,
  DIALOG = 1000,
  TOOLTIP = 2000,
}

export const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  chainId: number;
  isImport?: boolean;
}

export const NATIVE_TOKEN: {
  [chainId: number]: TokenInfo;
} = {
  42161: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 42161,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_TOKENS: {
  [chainId: number]: TokenInfo[];
} = {
  42161: arbitrumTokens,
};

export const MULTICALL_ADDRESS: { [chainId: number]: string } = {
  42161: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
};

export const AGGREGATOR_PATH: { [chainId: number]: string } = {
  42161: 'arbitrum',
};

export const SCAN_LINK: { [chainId: number]: string } = {
  42161: 'https://arbiscan.io',
};

export const SUPPORTED_NETWORKS = Object.keys(SCAN_LINK);
