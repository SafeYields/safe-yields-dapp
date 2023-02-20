import { Flex, Grid, Loader, Text } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { CardContentBox } from 'components/InfoCard/CardContentBox';
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
    injectedWalletConnected && priceData && safeTokenPrice ? (parseInt(priceData) * parseInt(safeTokenPrice)).toFixed(DECIMALS_TO_DISPLAY).concat(' $USDC') : undefined;

  const displaySafeValue = (priceData: string | null | undefined, unit = ' SAFE') =>
    <h1>{
      injectedWalletConnected ?
        priceData ? priceData.concat(unit) :
          <Loader size='lg' color='#F5F5F5' /> : '⸻'}
    </h1>;
  const router = useRouter();
  if (!process.env.NEXT_PUBLIC_PRESALE_IS_ACTIVE) {
    router.push('/nft');
    return <></>;
  } else
    return (
      <PageContainer title='Dashboard'>
        <Grid grow gutter={'sm'} align={'center'}>
          <Grid.Col span={6}>
            <InfoCard header={'SAFE Holdings'}>
              <CardContentBox footer={displayValueInUSDC(safeTokenBalance)}>
                {displaySafeValue(safeTokenBalance)}
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={6}>
            <InfoCard header={'NFT Rewards'}>
              <CardContentBox footer={displayValueInUSDC(NFTRewards)}>
                {displaySafeValue(NFTRewards)}
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={12}>
            <InfoCard header={'Your NFTs'}>
              <Flex
                gap='xl'
                justify='space-between'
                align='center'
                direction='row'
                wrap='wrap'
              >
                {[0, 1, 2, 3].map((tier) =>
                  (<CardContentBox key={`NFTBalanceTier${tier + 1}`}
                                   footer={injectedWalletConnected ? safeNFTBalance && safeNFTBalance[tier] ? `Total: ${parseInt(safeNFTBalance[tier])}` :
                                     <Loader size='xs' color='#F5F5F5' /> : '⸻'}>
                    <h1>Tier {tier + 1}</h1>
                  </CardContentBox>))}
              </Flex>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text align={'center'}>Total Treasury Ownership: {nftOfTreasury?.concat(' %') ??
              <Loader size='xs' color='#F5F5F5' />}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <InfoCard header={'SAFE Price'}>
              <CardContentBox>
                <h1 style={{ color: '#F5F5F5' }}>{
                  safeTokenPrice ? parseFloat(safeTokenPrice).toFixed(2).concat(' $USDC') :
                    <Loader size='lg' color='#F5F5F5' />}
                </h1>
                <br />
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={4}>
            <InfoCard header={'SAFE APR'}>
              <CardContentBox footer={'Last 30 days'}>
                <h1 style={{ color: '#F5F5F5' }}>{
                  safeTokenAPR ? safeTokenAPR.toFixed(1).concat(' %') :
                    <Loader size='lg' color='#F5F5F5' />}
                </h1>
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={4}>
            <InfoCard header={'NFT APR'}>
              <CardContentBox footer={'Last 30 days'}>
                <h1 style={{ color: '#F5F5F5' }}>{
                  nftAPR ? nftAPR.toFixed(1).concat('%') :
                    <Loader size='lg' color='#F5F5F5' />}
                </h1>
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          <Grid.Col span={12}>
            <InfoCard header={'NFTs Fair Value'}>
              <Flex
                gap='xl'
                justify='space-between'
                align='center'
                direction='row'
                wrap='wrap'
              >
                {[0, 1, 2, 3].map((tier) =>
                  (<CardContentBox key={`safeNFTFairPrice${tier + 1}`}
                                   footer={injectedWalletConnected ? safeNFTFairPrice && safeNFTFairPrice[tier] ? `${safeNFTFairPrice[tier]} $USDC` :
                                     <Loader size='xs' color='#F5F5F5' /> : '⸻'}>
                    <h1 color={'#F5F5F5'}>Tier {tier + 1}</h1>
                  </CardContentBox>))}
              </Flex>
            </InfoCard>
          </Grid.Col>
        </Grid>
      </PageContainer>
    );
};

export default Home;

Home.getLayout = AppLayout;
