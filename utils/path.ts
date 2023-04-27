const PATH = {
  HOME: '/',
  WEBSITE: 'https://www.safeyields.io',
  NOTIFICATION: '/notification',
  DASHBOARD: '/dashboard',
  YIELD: '/yield',
  EMMA: '/emma',
  SAFE: '/safe',
  NFT: '/nft',
  INVESTMENT: '/investments',
  EXPENSE: '/expense',
  WHITEPAPER: 'https://www.safeyields.io/safeyields_whitepaper.pdf',
} as const;

export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey];

  if (!args || pathKey == 'HOME' || val.startsWith('http')) {
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
