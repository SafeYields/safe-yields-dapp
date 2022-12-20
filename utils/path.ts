const PATH = {
  HOME: '/',
  NOTIFICATION: '/notification',
  DASHBOARD: '/dashboard',
  YIELD: '/yield',
  EMMA: '/emma-the-bot',
  SAFE: '/trade-safe',
  NFT: '/buy-nft',
  INVESTMENT: '/ivestment-pool',
  EXPENSE: '/expense-log',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey];

  if (!args) {
    return val;
  }

  const dirs = val.slice(1).split('/');

  const newPath = dirs.map((dir) => {
    if (dir.startsWith('[')) {
      const replaceDir = args[0];
      args.shift();
      return replaceDir;
    }
    return dir;
  });

  return '/' + newPath.join('/');
};
