import useSWR from 'swr';

import useSafeTokenContract from './useSafeTokenContract';

const useSafePrice = () => {
  const safeTokenContract = useSafeTokenContract();

  return useSWR(
    null,
    () => safeTokenContract?.price(),
    {
      refreshInterval: 10 * 1000,
    },
  );
};

export default useSafePrice;
