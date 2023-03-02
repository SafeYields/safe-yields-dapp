import { isAddress } from '@ethersproject/address';
import { Grid, Loader, Text, Title } from '@mantine/core';
import { transactionInProgressAtom } from 'components/Account/Account';
import { CountdownTimer } from 'components/CountdownTimer';
import { FancyButton } from 'components/FancyButton';
import { FormattedAmount } from 'components/FormatPrice';
import { InfoCard } from 'components/InfoCard';
import { CardContentBox } from 'components/InfoCard/CardContentBox';
import { PageContainer } from 'components/PageContainer';
import useFetchFromApi from 'hooks/useFetchFromApi';
import useNFTContract from 'hooks/useNFTContract';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useUsdcAllowance from 'hooks/useUsdcAllowance';
import useUsdcBalance from 'hooks/useUsdcBalance';
import useWalletConnected from 'hooks/useWalletConnected';
import { useAtom } from 'jotai';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { BuyNFTModal } from '../../components/BuyNFTDModal/BuyNFTModal';
import useSafeNFTOwnership from '../../hooks/useSafeNFTOnwership';


const TierHeader: FC<{ tier: number }> = (props) =>
  (<Title order={3} sx={theme => {
    return {
      color: theme.colors.limeGreen[1],
    };
  }}> Tier {props.tier}</Title>);


const Nft: NextPageWithLayout = () => {
    const router = useRouter();
    const injectedWalletConnected = useWalletConnected();
    const nftRegularPostPresalePrice = useFetchFromApi('nft/price')?.data;
    const nftDiscountedPrice = useFetchFromApi('nft/presale-price')?.data;
    const week = useFetchFromApi('nft/week')?.data;
    const presaleLaunchDate = useFetchFromApi('nft/presale')?.data;
    const safeNFTBalance = useSafeNFTBalance()?.data;
    const safeNFTOwnership = useSafeNFTOwnership();
    const nftContract = useNFTContract();
    const usdAllowance = useUsdcAllowance(nftContract?.address)?.data;
    const usdcBalance = useUsdcBalance()?.data;
    const presaleNFTAvailable = useFetchFromApi('nft/available')?.data;
    const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);
    const contractsLoaded = !!nftRegularPostPresalePrice && !!usdcBalance && !!usdAllowance;

    const presaleInProgress = !!presaleLaunchDate && week && week > 0 && week <= 4;

    const { ref: whoReferred } = router.query;
    console.log('whoReferred', whoReferred);
    const referralAddress = whoReferred && isAddress(whoReferred as string) ? whoReferred as string : undefined;
    console.log('referralAddress', referralAddress);

    const enoughBalanceForTier = (tier: number) => contractsLoaded && Number(nftDiscountedPrice[tier]) <= Number(usdcBalance);
    const presaleNFTAvailableForTier = (tier: number) => contractsLoaded && presaleNFTAvailable && parseInt(presaleNFTAvailable[tier]) > 0;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState(0);
    const handleModalOpen = (tier: number) => {
      setIsModalOpen(true);
      setSelectedTier(tier);
      return true;
    };
    const handleModalClose = () => {
      setIsModalOpen(false);
      return true;
    };

    return (
      <PageContainer title='Buy NFT'>
        {isModalOpen &&
          <BuyNFTModal opened={isModalOpen} handleModalClose={handleModalClose} referralAddress={referralAddress}
                       tier={selectedTier} />}
        {week && presaleLaunchDate ?
          <Grid grow gutter={'md'} align={'center'} justify={'space-between'} mt={'lg'}
                style={{ textAlign: 'center', filter: isModalOpen ? 'blur(5px)' : 'none' }}>
            {presaleInProgress &&
              <Grid.Col span={12}>
                <InfoCard header={`${5 - week}0% Discount ends in`} maxWidth='400px'>
                  <CardContentBox>
                    <CountdownTimer endDate={1000 * presaleLaunchDate + week * 14400 * 1000} />
                  </CardContentBox>
                </InfoCard>
              </Grid.Col>}
            {[0, 1, 2, 3].map((tier) => (
              <Grid.Col span={3} key={tier}>
                <InfoCard header={<TierHeader tier={tier + 1} />}
                          background={safeNFTBalance && parseInt(safeNFTBalance[tier]) ? `url(/assets/nft-icon-${tier + 1}.png) center/cover no-repeat` : undefined}>
                  <CardContentBox footer={(<FancyButton
                    style={{ height: '24px' }}
                    onClick={() => handleModalOpen(tier)}
                    loading={executionInProgress}
                    disabled={!injectedWalletConnected || executionInProgress || !enoughBalanceForTier(tier) || !presaleNFTAvailableForTier(tier)}
                  >
                    {!contractsLoaded ? 'Buy' :
                      !enoughBalanceForTier(tier) ? 'No balance' : presaleNFTAvailableForTier(tier) ? 'Buy' : 'Sold Out'
                    }
                  </FancyButton>)}>
                    {safeNFTBalance && (safeNFTBalance[tier]) && typeof (safeNFTBalance[tier]) == 'string'
                      ?
                      <Text color='#FFFFFF'
                            size='xs'>
                        {
                          safeNFTOwnership[tier].toString() + '% '}
                        Ownership</Text>
                      :
                      <Loader size='xs' color='#F5F5F5' />}
                    <FormattedAmount price={!(nftRegularPostPresalePrice) || nftRegularPostPresalePrice[tier]}
                                     crossed={presaleInProgress}
                                     mt={'xs' }
                                     size={'sm'}
                    />
                    {presaleInProgress &&
                      <FormattedAmount price={!(nftDiscountedPrice) || nftDiscountedPrice[tier]} />}
                    {presaleInProgress && presaleNFTAvailable && <Text>available: {parseInt(presaleNFTAvailable[tier])}</Text>
                    }
                  </CardContentBox>
                </InfoCard>
                <FormattedAmount caption='Your NFTs: ' price={!(safeNFTBalance) || safeNFTBalance[tier]} unit=''
                                 decimals={0} />
              </Grid.Col>
            ))}
            {referralAddress &&
              (<Grid.Col span={12} mt={'xs'}>
                <Text>Referral: <strong>{referralAddress}</strong></Text>
              </Grid.Col>)}

            <Grid.Col span={12} mt={'lg'}>
              <Title order={4}> Don’t know how our NFTs work? Read our Whitepaper</Title>
              <Link href={'https://safeyields.io/safeyields_whitepaper.pdf'} target='_blank' rel='noopener noreferrer'
                    passHref>
                <FancyButton mt={'20px'} py={10}>Read Whitepaper</FancyButton>
              </Link>
            </Grid.Col>
          </Grid> : <></>}
      </PageContainer>
    );
  }
;

export default Nft;
Nft.getLayout = AppLayout;
