import { Flex, Grid, Loader, MediaQuery, Text } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { CardContentBox } from 'components/InfoCard/CardContentBox';
import { PageContainer } from 'components/PageContainer';
import useNFTOfTreasury from 'hooks/useNFTOfTreasury';
import useNFTRewards from 'hooks/useNFTRewards';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useSafeTokenBalance from 'hooks/useSafeTokenBalance';
import useWalletConnected from 'hooks/useWalletConnected';
import { useAtom } from 'jotai';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import { transactionInProgressAtom } from '../components/Account/Account';
import { FancyButton } from '../components/FancyButton';
import { FormattedAmount } from '../components/FormatPrice';
import { TierHeader } from '../components/TierHeader';
import { DECIMALS_TO_DISPLAY } from '../config';
import { executeContractHandler } from '../handlers/executeContractHandler';
import useFetchFromApi from '../hooks/useFetchFromApi';
import useNFTContract from '../hooks/useNFTContract';
import useSafeNFTOwnership from '../hooks/useSafeNFTOnwership';
import useSafePlusTokenBalance from '../hooks/useSafePlusTokenBalance';

const Home: NextPageWithLayout = () => {
  const injectedWalletConnected = useWalletConnected();
  const safeTokenPrice = useFetchFromApi('safe/price')?.data;
  // const safeTokenPrice = useSafeTokenPrice()?.data;
  const safeTokenBalance = useSafeTokenBalance()?.data;
  const safePlusTokenBalance = useSafePlusTokenBalance()?.data;
  const NFTRewards = useNFTRewards()?.data;
  const safeNFTFairPrice = useFetchFromApi('nft/fairprice')?.data;
  // const safeNFTFairPrice = useSafeNFTFairPrice()?.data;
  const safeNFTBalance = useSafeNFTBalance()?.data;
  // const safeTokenAPR = useSafeTokenAPR()?.data;
  const safeTokenAPR = useFetchFromApi('safe/apr')?.data;
  const nftAPR = useFetchFromApi('nft/apr')?.data;
  const nftOfTreasury = useNFTOfTreasury()?.data;
  const safeNFTOwnership = useSafeNFTOwnership();
  const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);
  const nftContract = useNFTContract();
  const claimRewardsHandler = () =>
    Number(NFTRewards) >= 0 &&
    nftContract &&
    executeContractHandler(setExecutionInProgress, () => nftContract.claimReward(0, 0));

  const displayValueInUSDC = (priceData: string | null | undefined) =>
    injectedWalletConnected && priceData && safeTokenPrice
      ? (parseFloat(priceData) * parseFloat(safeTokenPrice))
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

  const displayDollarValue = (priceData: string | null | undefined, unit = ' $') => (
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
  return (
    <PageContainer title='Dashboard'>
      <Grid grow gutter={'sm'} align={'center'}>
        <MediaQuery smallerThan='lg' styles={{ display: 'none' }}>
          <Grid.Col span={2}></Grid.Col>
        </MediaQuery>
        <Grid.Col span={4}>
          <InfoCard header={'SAFE Holdings'}>
            <CardContentBox footer={displayValueInUSDC(safeTokenBalance)}>
              {displaySafeValue(safeTokenBalance)}
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        {/* <Grid.Col span={3}>*/}
        {/*  <InfoCard header={'SAFE+ Holdings'}>*/}
        {/*    <CardContentBox footer={displayValueInUSDC(safeTokenBalance)}>*/}
        {/*      {displaySafeValue(safeTokenBalance, ' SAFE+')}*/}
        {/*    </CardContentBox>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        <Grid.Col span={4}>
          <InfoCard header={'NFT Rewards'}>
            <CardContentBox
              footer={
                <FancyButton
                  style={{ height: '24px' }}
                  onClick={claimRewardsHandler}
                  loading={executionInProgress}
                  disabled={
                    !injectedWalletConnected ||
                    executionInProgress ||
                    !!(NFTRewards && parseFloat(NFTRewards) == 0)
                  }
                >
                  Сlaim
                </FancyButton>
              }
            >
              {displayDollarValue(NFTRewards)}
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <MediaQuery smallerThan='lg' styles={{ display: 'none' }}>
          <Grid.Col span={2}></Grid.Col>
        </MediaQuery>
        {[0, 1, 2, 3].map((tier) => (
          <Grid.Col span={3} key={tier}>
            <InfoCard
              header={<TierHeader tier={tier + 1} />}
              minHeight='220px'
              background={`url(/assets/nft-icon-${tier + 1}.png) center/cover no-repeat`}
              gray={!(safeNFTBalance && parseInt(safeNFTBalance[tier]))}
            >
              <CardContentBox
                footer={
                  <FormattedAmount
                    caption='Your NFTs: '
                    price={!safeNFTBalance || safeNFTBalance[tier]}
                    unit=''
                    decimals={0}
                  />
                }
              >
                {safeNFTBalance &&
                safeNFTBalance[tier] &&
                typeof safeNFTBalance[tier] == 'string' ? (
                  <Text color='#FFFFFF' size='xs'>
                    {safeNFTOwnership[tier].toString() + '% '}
                    Ownership
                  </Text>
                ) : (
                  '⸻'
                )}
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
        ))}
        <Grid.Col span={12}>
          <Text align={'center'}>
            Total Treasury Ownership:{' '}
            {nftOfTreasury?.concat(' %') ?? <Loader size='xs' color='#F5F5F5' />}
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <InfoCard header={'SAFE Price'} minWidth={'130px'}>
            <CardContentBox>
              <h2 style={{ color: '#F5F5F5' }}>
                {safeTokenPrice ? parseFloat(safeTokenPrice).toFixed(2).concat(' $USDC') : '⸻'}
              </h2>
              <br />
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        {/* <Grid.Col span={2}>*/}
        {/*  <InfoCard header={'SAFE+ Price'} minWidth={'130px'}>*/}
        {/*    <CardContentBox>*/}
        {/*      <h2 style={{ color: '#F5F5F5' }}>*/}
        {/*        {safeTokenPrice ? parseFloat(safeTokenPrice).toFixed(2).concat(' $USDC') : '⸻'}*/}
        {/*      </h2>*/}
        {/*      <br />*/}
        {/*    </CardContentBox>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        <Grid.Col span={2}>
          <InfoCard header={'SAFE APR'} minWidth={'130px'}>
            <CardContentBox footer={'Last 30 days'}>
              <h2 style={{ color: '#F5F5F5' }}>
                {safeTokenAPR ? (
                  safeTokenAPR.toFixed(1).concat(' %')
                ) : (
                  <Loader size='lg' color='#F5F5F5' />
                )}
              </h2>
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        {/* <Grid.Col span={2}>*/}
        {/*  <InfoCard header={'SAFE+ APR'} minWidth={'130px'}>*/}
        {/*    <CardContentBox footer={'Last 30 days'}>*/}
        {/*      <h2 style={{ color: '#F5F5F5' }}>*/}
        {/*        {safeTokenAPR ? (*/}
        {/*          safeTokenAPR.toFixed(1).concat(' %')*/}
        {/*        ) : (*/}
        {/*          <Loader size='lg' color='#F5F5F5' />*/}
        {/*        )}*/}
        {/*      </h2>*/}
        {/*    </CardContentBox>*/}
        {/*  </InfoCard>*/}
        {/* </Grid.Col>*/}
        <Grid.Col span={2}>
          <InfoCard header={'NFT APR'} minWidth={'130px'}>
            <CardContentBox footer={'Last 30 days'}>
              <h2 style={{ color: '#F5F5F5' }}>
                {nftAPR ? nftAPR.toFixed(1).concat('%') : <Loader size='lg' color='#F5F5F5' />}
              </h2>
            </CardContentBox>
          </InfoCard>
        </Grid.Col>
        <Grid.Col span={12}>
          <InfoCard header={'NFTs Fair Value'}>
            <Flex gap='xl' justify='space-between' align='center' direction='row' wrap='wrap'>
              {[0, 1, 2, 3].map((tier) => (
                <CardContentBox
                  key={`safeNFTFairPrice${tier + 1}`}
                  footer={
                    injectedWalletConnected ? (
                      safeNFTFairPrice && safeNFTFairPrice[tier] ? (
                        `${safeNFTFairPrice[tier]} $USDC`
                      ) : (
                        <Loader size='xs' color='#F5F5F5' />
                      )
                    ) : (
                      '⸻'
                    )
                  }
                >
                  <h1 style={{ color: '#F1F1F1' }}>Tier {tier + 1}</h1>
                </CardContentBox>
              ))}
            </Flex>
          </InfoCard>
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
