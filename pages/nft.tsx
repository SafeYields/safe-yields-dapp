import { Grid, Loader, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FancyButton } from 'components/FancyButton';
import { InfoCard } from 'components/InfoCard';
import { CardContentBox } from 'components/InfoCard/CardContentBox';
import { PageContainer } from 'components/PageContainer';
import useNFTContract from 'hooks/useNFTContract';
import useNFTRewards from 'hooks/useNFTRewards';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useSafeNFTBuyPrice from 'hooks/useSafeNFTBuyPrice';
import useSafeNFTFairPrice from 'hooks/useSafeNFTFairPrice';
import useSafeTokenAPR from 'hooks/useSafeTokenAPR';
import useSafeTokenBalance from 'hooks/useSafeTokenBalance';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import useWalletConnected from 'hooks/useWalletConnected';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import { FC, useState } from 'react';
import { Check, X } from 'tabler-icons-react';

import { FormatPrice } from '../components/FormatPrice';

const TierHeader: FC<{ tier: number }> = (props) =>
  (<Title order={3} sx={theme => {
    return {
      color: theme.colors.limeGreen[1],
    };
  }}> Tier {props.tier}</Title>);


const Nft: NextPageWithLayout = () => {
  const { data: fairPrice } = useSafeNFTFairPrice();
  const injectedWalletConnected = useWalletConnected();
  const safeTokenPrice = useSafeTokenPrice()?.data;
  const safeTokenBalance = useSafeTokenBalance()?.data;
  const NFTRewards = useNFTRewards()?.data;
  const safeNFTFairPrice = useSafeNFTFairPrice()?.data;
  const nftPrice = useSafeNFTBuyPrice()?.data;
  const safeNFTBalance = useSafeNFTBalance()?.data;
  const safeTokenAPR = useSafeTokenAPR()?.data;
  const nftContract = useNFTContract();
  const [executionInProgress, setExecutionInProgress] = useState(false);

  const buyNFTHandler = (tier: number) => {
    setExecutionInProgress(true);
    showNotification({
      message: 'Executing transaction...',
    });
    console.log(`tier ${tier}`);
    console.log(`nftContract ${nftContract}`);
    nftContract?.buy(tier, 1)
      .then((tx) => {
        showNotification({
          title: 'Success',
          color: 'lime',
          icon: <Check size={18} />,
          message: 'Smart contract transaction sent. Please wait for confirmation.',
        });
        tx.wait().then(() => {
          showNotification({
            title: 'Success',
            message: 'Smart contract transaction confirmed.',
          });
          setExecutionInProgress(false);
        });
      })
      .catch((err) => {
        console.error('err', err);
        showNotification({
          title: 'Error',
          color: 'yellow',
          icon: <X size={18} />,
          message: err ? err.reason : 'Smart Contract Execution Error.',
          radius: 'lg',
        });
        setExecutionInProgress(false);
      });
  };


  const displaySafeValue = (priceData: string | null | undefined, unit = ' SAFE') =>
    <h1>{
      injectedWalletConnected ?
        priceData ? priceData.concat(unit) :
          <Loader size='lg' color='#F5F5F5' /> : '⸻'}
    </h1>;


  return (
    <PageContainer title='Buy NFT'>
      <Grid grow gutter={'md'} align={'center'} justify={'space-between'} mt={'lg'} style={{ textAlign: 'center' }}>
        <Grid.Col span={12}>
          <Title order={1}>Choose the best TIER for you</Title>
        </Grid.Col>
        {[0, 1, 2, 3].map((tier) => (
          <Grid.Col span={3} key={tier}>
            <InfoCard header={<TierHeader tier={tier + 1} />}>
              <CardContentBox footer={(<FancyButton onClick={() => buyNFTHandler(tier)}
                                                    disabled={!injectedWalletConnected || executionInProgress}> Buy</FancyButton>)}>
                <FormatPrice price={!(nftPrice) || nftPrice[tier]} />
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
        ))}
        <Grid.Col span={12} mt={'lg'}>
          <Title order={2}> Don’t know how our NFTs work? Read our Whitepaper</Title>
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};

export default Nft;
Nft.getLayout = AppLayout;
