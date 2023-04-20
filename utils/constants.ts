import { arbitrumTokens, arbitrumTokensGoerli, safeTokens, safeTokensGoerli } from './tokens';

export enum ZIndex {
  UNDERLAYER = -1,
  OVERLAY = 100,
  DIALOG = 1000,
  TOOLTIP = 2000,
}

export const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const USDC_TOKEN_ADDRESS = '0x179522635726710Dd7D2035a81d856de4Aa7836c';
export const SAFE_TOKEN_ADDRESS = '0xeeC181F2008b0f719e572000b1F02F120634326C';

export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI: string;
  chainId: number;
  isImport?: boolean;
  _scan?: string;
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
  421613: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 421613,
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_TOKENS: {
  [chainId: number]: TokenInfo[];
} = {
  42161: arbitrumTokens,
  421613: arbitrumTokensGoerli,
};
export const SAFE_TOKENS: {
  [chainId: number]: TokenInfo[];
} = {
  42161: safeTokens,
  421613: safeTokensGoerli,
};

export const MULTICALL_ADDRESS: { [chainId: number]: string } = {
  42161: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  421613: '0x108B25170319f38DbED14cA9716C54E5D1FF4623',
};

export const SCAN_LINK: { [chainId: number]: string } = {
  42161: 'https://arbiscan.io',
  421613: 'https://goerli.arbiscan.io/',
};

export const SUPPORTED_NETWORKS = Object.keys(SCAN_LINK);
