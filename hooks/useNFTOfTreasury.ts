import useSWR from 'swr';

import useNFTContract from './useNFTContract';

const useNFTOfTreasury = () => {
  const safeNFTContract = useNFTContract();
  return useSWR('getMyShareOfTreasury', async () =>
    safeNFTContract
      ? ((await safeNFTContract.getMyShareOfTreasury()).toNumber() / (100 * 1_000_000)).toFixed(6)
      : null,
  );
};

export default useNFTOfTreasury;
