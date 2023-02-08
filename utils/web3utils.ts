import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

import { DECIMALS_TO_DISPLAY } from '../config';

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

const ARBISCAN_PREFIXES: Record<number, string> = {
  42161: '',
  421613: 'testnet.',
};

export function formatEtherscanLink(
  type: 'Account' | 'Transaction',
  data: [number, string],
) {
  switch (type) {
    case 'Account': {
      const [chainId, address] = data;
      return `https://${ARBISCAN_PREFIXES[chainId]}arbiscan.io/address/${address}`;
    }
    case 'Transaction': {
      const [chainId, hash] = data;
      return `https://${ARBISCAN_PREFIXES[chainId]}arbiscan.io/tx/${hash}`;
    }
  }
}

export const fromWeiToString = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = DECIMALS_TO_DISPLAY,
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
