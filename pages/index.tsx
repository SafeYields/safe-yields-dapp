import { Center, Loader, Stack, Title } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import useNFTOfTreasury from 'hooks/useNFTOfTreasury';
import useNFTRewards from 'hooks/useNFTRewards';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useSafeTokenBalance from 'hooks/useSafeTokenBalance';
import useWalletConnected from 'hooks/useWalletConnected';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import { DECIMALS_TO_DISPLAY } from '../config';
import useFetchFromApi from '../hooks/useFetchFromApi';

const Home: NextPageWithLayout = () => {
  const injectedWalletConnected = useWalletConnected();
  const safeTokenPrice = useFetchFromApi('safe/price')?.data;
  // const safeTokenPrice = useSafeTokenPrice()?.data;
  const safeTokenBalance = useSafeTokenBalance()?.data;
  const NFTRewards = useNFTRewards()?.data;
  const safeNFTFairPrice = useFetchFromApi('nft/fairprice')?.data;
  // const safeNFTFairPrice = useSafeNFTFairPrice()?.data;
  const safeNFTBalance = useSafeNFTBalance()?.data;
  // const safeTokenAPR = useSafeTokenAPR()?.data;
  const safeTokenAPR = useFetchFromApi('safe/apr')?.data;
  const nftAPR = useFetchFromApi('nft/apr')?.data;
  const nftOfTreasury = useNFTOfTreasury()?.data;
  const displayValueInUSDC = (priceData: string | null | undefined) =>
    injectedWalletConnected && priceData && safeTokenPrice
      ? (parseInt(priceData) * parseInt(safeTokenPrice))
          .toFixed(DECIMALS_TO_DISPLAY)
          .concat(' $USDC')
      : undefined;

  const displaySafeValue = (priceData: string | null | undefined, unit = ' SAFE') => (
    <h1>
      {injectedWalletConnected ? (
        priceData ? (
          priceData.concat(unit)
        ) : (
          <Loader size='lg' color='#F5F5F5' />
        )
      ) : (
        '⸻'
      )}
    </h1>
  );
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_PRESALE_IS_ACTIVE) {
    router.push('/nft');
  }
  return (
    <PageContainer title='Welcome'>
      <Stack justify={'center'} spacing={'md'} style={{ height: '50vh' }}>
        <Center>
          <Title order={5}>Welcome to</Title>
        </Center>
        <Center>
          <Title order={1}>SAFE YIELDS</Title>
        </Center>
        <Center>
          <Title order={5}>Safe Investments in DeFi</Title>
        </Center>
      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
