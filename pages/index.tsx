import { Flex, Grid, Loader, Text } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import { CardContentBox } from '../components/InfoCard/CardContentBox';
import { DECIMALS_TO_DISPLAY } from '../config';
import useNFTOfTreasury from '../hooks/useNFTOfTreasury';
import useNFTRewards from '../hooks/useNFTRewards';
import useSafeNFTBalance from '../hooks/useSafeNFTBalance';
import useSafeNFTFairPrice from '../hooks/useSafeNFTFairPrice';
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

  const displayBUSDPrice = (priceData: string | null | undefined) =>
    priceData && safeTokenPrice ? (parseInt(priceData) * parseInt(safeTokenPrice)).toFixed(DECIMALS_TO_DISPLAY).concat(' $BUSD') : undefined;

  const displaySafeValue = (priceData: string | null | undefined, unit = ' SAFE') =>
    <h1>{
      injectedWalletConnected ?
        priceData ? priceData.concat(unit) :
          <Loader size='lg' color='green' /> : '⸻'}
    </h1>;
  return (
    <PageContainer title='Dashboard'>
      <Grid grow gutter={'sm'} align={'center'}>
        <Grid.Col span={6}>
          <InfoCard header={'SAFE Holdings'}>
            <CardContentBox footer={displayBUSDPrice(safeTokenBalance)}>
              {displaySafeValue(safeTokenBalance)}
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={6}>
          <InfoCard header={'NFT Rewards'}>
            <CardContentBox footer={displayBUSDPrice(NFTRewards)}>
              {displaySafeValue(NFTRewards)}
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={12}>
          <InfoCard header={'Your NFTs'}>
            <Flex
              mih={50}
              gap='md'
              justify='flex-start'
              align='flex-start'
              direction='row'
              wrap='wrap'
            >
              {safeNFTBalance && safeNFTBalance.map((tierBalance, tier) =>
                (<CardContentBox key={`NFTBalanceTier${tier}`}
                                 footer={injectedWalletConnected ? tierBalance ? `Total: ${parseInt(tierBalance)}` :
                                   <Loader size='xs' color='green' /> : '⸻'}>
                  <h1>Tier{tier}</h1>
                </CardContentBox>))}
            </Flex>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text align={'center'}>Total Treasury Ownership: {useNFTOfTreasury()?.data?.concat(' %') ??
            <Loader size='xs' color='white' />}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <InfoCard header={'SAFE Price'}>
            <CardContentBox>
              <h1 style={{ color: 'white' }}>{
                safeTokenPrice ? safeTokenPrice.concat(' $BUSD') :
                  <Loader size='lg' color='yellow' />}
              </h1>;
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <InfoCard header={'SAFE APR'}>
            <h1>SAFE APR</h1>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={4}>
          <InfoCard header={'NFT APR'}>
            <h1>NFT APR</h1>
          </InfoCard>
        </Grid.Col>
        {/* <Grid.Col span={12}>*/}
        {/*  <InfoCard header={'NFTs Fair Value'}>*/}
        {/*    <h1>NFTs Fair Value</h1>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
      </Grid>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
