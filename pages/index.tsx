import { Grid, Loader } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import { CardContentBox } from '../components/InfoCard/CardContentBox';
import { DECIMALS_TO_DISPLAY } from '../config';
import useSafeNFTFairPrice from '../hooks/useSafeNFTFairPrice';
import useSafeTokenBalance from '../hooks/useSafeTokenBalance';
import useWalletConnected from '../hooks/useWalletConnected';


const Home: NextPageWithLayout = () => {
  const { data: fairPrice } = useSafeNFTFairPrice();
  const injectedWalletConnected = useWalletConnected();
  const safeTokenPrice = useSafeTokenPrice().data;
  const safeTokenBalance = useSafeTokenBalance().data;

  return (
    <PageContainer title='Dashboard'>
      <Grid grow gutter={'sm'} align={'center'}>
        <Grid.Col span={6}>
          <InfoCard>
            <CardContentBox header={'SAFE Holdings'}
                            footer={safeTokenBalance && safeTokenPrice ? (parseInt(safeTokenBalance) * parseInt(safeTokenPrice)).toFixed(DECIMALS_TO_DISPLAY).concat(' $BUSD') : undefined}>
              <h1>{
                injectedWalletConnected ?
                  safeTokenBalance ? safeTokenBalance.concat(' SAFE') :
                    <Loader size='lg' color='green' /> : '⸻'}</h1>
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={6}>
          <InfoCard>
            <CardContentBox header={'NFT Rewards'}>
              <h1>{useSafeTokenPrice().data?.concat(' $') ?? <Loader size='lg' color='green' />}</h1>
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        {/* <Grid.Col span={12}>*/}
        {/*  <InfoCard header={'Your NFTs'}>*/}
        {/*    <h1>Tiers</h1>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        {/* <Grid.Col span={12}>*/}
        {/*  <Text align={'center'}>Total Treasury Ownership</Text>*/}
        {/* </Grid.Col>*/}
        {/* <Grid.Col span={4}>*/}
        {/*  <InfoCard header={'SAFE Price'}>*/}
        {/*    <h1>SAFE Price</h1>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        {/* <Grid.Col span={4}>*/}
        {/*  <InfoCard header={'SAFE APR'}>*/}
        {/*    <h1>SAFE APR</h1>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        {/* <Grid.Col span={4}>*/}
        {/*  <InfoCard header={'NFT APR'}>*/}
        {/*    <h1>NFT APR</h1>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
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
