import { Grid, Loader, Title } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import { CardContentBox } from '../components/InfoCard/CardContentBox';
import { DECIMALS_TO_DISPLAY } from '../config';
import useNFTRewards from '../hooks/useNFTRewards';
import useSafeNFTBalance from '../hooks/useSafeNFTBalance';
import useSafeNFTFairPrice from '../hooks/useSafeNFTFairPrice';
import useSafeTokenAPR from '../hooks/useSafeTokenAPR';
import useSafeTokenBalance from '../hooks/useSafeTokenBalance';
import useWalletConnected from '../hooks/useWalletConnected';


const Home: NextPageWithLayout = () => {
  const { data: fairPrice } = useSafeNFTFairPrice();
  const injectedWalletConnected = useWalletConnected();
  const safeTokenPrice = useSafeTokenPrice()?.data;
  const safeTokenBalance = useSafeTokenBalance()?.data;
  const NFTRewards = useNFTRewards()?.data;
  const safeNFTFairPrice = useSafeNFTFairPrice()?.data;
  const safeNFTBalance = useSafeNFTBalance()?.data;
  const safeTokenAPR = useSafeTokenAPR()?.data;

  const displayBUSDPrice = (priceData: string | null | undefined) =>
    injectedWalletConnected && priceData && safeTokenPrice ? (parseInt(priceData) * parseInt(safeTokenPrice)).toFixed(DECIMALS_TO_DISPLAY).concat(' $BUSD') : undefined;

  const displaySafeValue = (priceData: string | null | undefined, unit = ' SAFE') =>
    <h1>{
      injectedWalletConnected ?
        priceData ? priceData.concat(unit) :
          <Loader size='lg' color='#F5F5F5' /> : '⸻'}
    </h1>;
  return (
    <PageContainer title='Buy NFT' >
      <Grid grow gutter={'md'} align={'center'} justify={'space-between'} mt={'lg'} style={{ textAlign: 'center' }}>
        <Grid.Col span={12}>
          <Title order={1}>Choose the best TIER for you</Title>
        </Grid.Col>
        {[0,1,2,3].map(( tier) => (
        <Grid.Col span={3} key={tier}>
          <InfoCard header={`Tier ${tier+1}`}>
            <CardContentBox footer={displayBUSDPrice(NFTRewards)}>
              {displaySafeValue(NFTRewards)}
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
          ))}
        <Grid.Col span={12} mt={'lg'}>
          <Title order={2}>Don’t know how our NFTs work? Read our Whitepaper</Title>
        </Grid.Col>
      </Grid>
    </PageContainer>
  )
    ;
};

export default Home;

Home.getLayout = AppLayout;
