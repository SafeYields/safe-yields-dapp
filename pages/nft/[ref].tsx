import { isAddress } from '@ethersproject/address';
import { Center, Grid, Loader, Stack, Text, Title } from '@mantine/core';
import { transactionInProgressAtom } from 'components/Account/Account';
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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { BuyNFTModal } from '../../components/BuyNFTDModal/BuyNFTModal';
import { TierHeader } from '../../components/TierHeader';
import useSafeNFTOwnership from '../../hooks/useSafeNFTOnwership';

const Nft: NextPageWithLayout = () => {
  const router = useRouter();
  const injectedWalletConnected = useWalletConnected();
  const nftRegularPostPresalePrice = useFetchFromApi('nft/price')?.data;
  const nftDiscountedPrice = ['124.6875', '249.375', '498.75', '997.5'];
  const safeNFTBalance = useSafeNFTBalance()?.data;
  const safeNFTOwnership = useSafeNFTOwnership();
  const nftContract = useNFTContract();
  const usdAllowance = useUsdcAllowance(nftContract?.address)?.data;
  const usdcBalance = useUsdcBalance()?.data;
  const presaleNFTAvailable = useFetchFromApi('nft/available')?.data;
  const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);
  const contractsLoaded = !!nftRegularPostPresalePrice && !!usdcBalance && !!usdAllowance;

  const presaleInProgress = false;

  const { ref: whoReferred } = router.query;
  console.log('whoReferred', whoReferred);
  const referralAddress =
    whoReferred && isAddress(whoReferred as string) ? (whoReferred as string) : undefined;
  console.log('referralAddress', referralAddress);

  const enoughBalanceForTier = (tier: number) =>
    nftDiscountedPrice && Number(nftDiscountedPrice[tier]) <= Number(usdcBalance);
  const presaleNFTAvailableForTier = (tier: number) =>
    contractsLoaded && presaleNFTAvailable && parseInt(presaleNFTAvailable[tier]) > 0;

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
      {isModalOpen && (
        <BuyNFTModal
          opened={isModalOpen}
          handleModalClose={handleModalClose}
          referralAddress={referralAddress}
          tier={selectedTier}
        />
      )}

      <Center>
        <InfoCard header={'Christmas NFT Sale'} minWidth='240px' hover={false}>
          <Stack align='center' spacing={0}>
            <Image
              src='/assets/3-1nfts.svg'
              alt='3 for 2 nfts'
              height={100}
              width={150}
              style={{ marginTop: -20, marginBottom: -12 }}
            />
            <Title order={3} color='#4CFAC7' style={{ fontSize: 24 }}>
              Buy 2 get 1 free
            </Title>
            <Text color='#F1F1F1' style={{ fontSize: 10, marginTop: 6 }}>
              Airdropped by the end of December
            </Text>
          </Stack>
        </InfoCard>
      </Center>
      <Grid
        grow
        gutter={'md'}
        align={'center'}
        justify={'space-between'}
        mt={'lg'}
        style={{ textAlign: 'center', filter: isModalOpen ? 'blur(5px)' : 'none' }}
      >
        {[0, 1, 2, 3].map((tier) => (
          <Grid.Col span={3} key={tier}>
            <InfoCard
              header={<TierHeader tier={tier + 1} />}
              background={
                safeNFTBalance && parseInt(safeNFTBalance[tier])
                  ? `url(/assets/nft-icon-${tier + 1}.png) center/cover no-repeat`
                  : undefined
              }
            >
              <CardContentBox
                footer={
                  <FancyButton
                    style={{
                      height: '24px',
                      backgroundColor: '#9999ff',
                      color: 'white',
                      fontSize: '12px',
                      paddingLeft: 24,
                      paddingRight: 24,
                    }}
                    onClick={() => handleModalOpen(tier)}
                    loading={executionInProgress}
                    disabled={
                      !injectedWalletConnected ||
                      executionInProgress ||
                      !enoughBalanceForTier(tier) ||
                      !presaleNFTAvailableForTier(tier)
                    }
                  >
                    {!contractsLoaded
                      ? 'Buy'
                      : !enoughBalanceForTier(tier)
                      ? 'No balance'
                      : presaleNFTAvailableForTier(tier)
                      ? 'Buy'
                      : 'Sold Out'}
                  </FancyButton>
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
                  <Loader size='xs' color='#F5F5F5' />
                )}
                <FormattedAmount
                  price={!nftRegularPostPresalePrice || nftRegularPostPresalePrice[tier]}
                  crossed={presaleInProgress}
                  mt={'xs'}
                  size={'sm'}
                />
                {presaleInProgress && (
                  <FormattedAmount price={!nftDiscountedPrice || nftDiscountedPrice[tier]} />
                )}
                {presaleInProgress && presaleNFTAvailable && (
                  <Text>available: {parseInt(presaleNFTAvailable[tier])}</Text>
                )}
              </CardContentBox>
            </InfoCard>
            <FormattedAmount
              caption='Your NFTs: '
              price={!safeNFTBalance || safeNFTBalance[tier]}
              unit=''
              decimals={0}
            />
          </Grid.Col>
        ))}
        {referralAddress && (
          <Grid.Col span={12} mt={'xs'}>
            <Text>
              Referral: <strong>{referralAddress}</strong>
            </Text>
          </Grid.Col>
        )}
        <Grid.Col span={12} mt={'lg'}>
          <Title order={4}> Don’t know how our NFTs work? Read our Whitepaper</Title>
          <Link
            href={'https://safeyields.io/safeyields_whitepaper.pdf'}
            target='_blank'
            rel='noopener noreferrer'
            passHref
          >
            <FancyButton mt={'20px'} py={10}>
              Read Whitepaper
            </FancyButton>
          </Link>
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};
export default Nft;
Nft.getLayout = AppLayout;
