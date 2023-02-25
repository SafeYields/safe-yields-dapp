import { isAddress } from '@ethersproject/address';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { Grid, Loader, Text, Title } from '@mantine/core';
import { transactionInProgressAtom } from 'components/Account/Account';
import { CountdownTimer } from 'components/CountdownTimer';
import { FancyButton } from 'components/FancyButton';
import { FormattedAmount } from 'components/FormatPrice';
import { InfoCard } from 'components/InfoCard';
import { CardContentBox } from 'components/InfoCard/CardContentBox';
import { PageContainer } from 'components/PageContainer';
import { executeContractHandler } from 'handlers/executeContractHandler';
import useFetchFromApi from 'hooks/useFetchFromApi';
import useNFTContract from 'hooks/useNFTContract';
import useNFTRewards from 'hooks/useNFTRewards';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useSafeNFTTotalSupply from 'hooks/useSafeNFTTotalSupply';
import useSafeTokenAPR from 'hooks/useSafeTokenAPR';
import useSafeTokenBalance from 'hooks/useSafeTokenBalance';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import useUsdcAllowance from 'hooks/useUsdcAllowance';
import useUsdcBalance from 'hooks/useUsdcBalance';
import useUsdcContract from 'hooks/useUsdcContract';
import useWalletConnected from 'hooks/useWalletConnected';
import { useAtom } from 'jotai';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';


const TierHeader: FC<{ tier: number }> = (props) =>
  (<Title order={3} sx={theme => {
    return {
      color: theme.colors.limeGreen[1],
    };
  }}> Tier {props.tier}</Title>);


const Nft: NextPageWithLayout = () => {
    const router = useRouter();
    const injectedWalletConnected = useWalletConnected();
    const safeTokenPrice = useSafeTokenPrice()?.data;
    const safeTokenBalance = useSafeTokenBalance()?.data;
    const NFTRewards = useNFTRewards()?.data;
    const nftRegularPostPresalePrice = useFetchFromApi('nft/price')?.data;
    const nftDiscountedPrice = useFetchFromApi('nft/presale-price')?.data;
    const safeNFTBalance = useSafeNFTBalance()?.data;
    const safeNFTTotalSupply = useSafeNFTTotalSupply()?.data;
    const safeTokenAPR = useSafeTokenAPR()?.data;
    const nftContract = useNFTContract();
    const usdAllowance = useUsdcAllowance(nftContract?.address)?.data;
    const usdcBalance = useUsdcBalance()?.data;
    const usdcContract = useUsdcContract();
    const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);

    const contractsLoaded = !!nftRegularPostPresalePrice && !!usdcBalance && !!usdAllowance;

    const { ref: whoReferred } = router.query;
    console.log('whoReferred', whoReferred);
    const referralAddress = whoReferred && isAddress(whoReferred as string) ? whoReferred as string : undefined;
    console.log('referralAddress', referralAddress);

    const enoughBalanceForTier = (tier: number) => contractsLoaded && Number(nftRegularPostPresalePrice[tier]) <= Number(usdcBalance);
    const enoughAllowanceForTier = (tier: number) => contractsLoaded && (Number(usdAllowance) >= Number(nftRegularPostPresalePrice[tier]));

    const buyNFTHandler = (tier: number) => usdAllowance && nftRegularPostPresalePrice && nftContract && usdcContract && (Number(usdAllowance) >= Number(nftRegularPostPresalePrice[tier])) &&
      executeContractHandler(setExecutionInProgress, () => nftContract.buy(tier, 1, referralAddress || AddressZero));

    const approveSpendUsdcForNFTHandler = (tier: number) => usdAllowance && nftRegularPostPresalePrice && nftContract && usdcContract && Number(usdAllowance) < Number(nftRegularPostPresalePrice[tier]) &&
      executeContractHandler(setExecutionInProgress, () => usdcContract.approve(nftContract.address, MaxUint256));

    const displayIfConnected = (priceData: string | null | undefined, unit = ' SAFE') =>
      <h1>{
        injectedWalletConnected ?
          priceData ? priceData.concat(unit) :
            <Loader size='lg' color='#F5F5F5' /> : '⸻'}
      </h1>;


    return (
      <PageContainer title='Buy NFT'>
        <Grid grow gutter={'md'} align={'center'} justify={'space-between'} mt={'lg'} style={{ textAlign: 'center' }}>
          <Grid.Col span={12}>
            <InfoCard header='40% Discount ends in' maxWidth='400px'>
              <CardContentBox>
                <CountdownTimer />
              </CardContentBox>
            </InfoCard>
          </Grid.Col>
          {[0, 1, 2, 3].map((tier) => (
            <Grid.Col span={3} key={tier}>
              <InfoCard header={<TierHeader tier={tier + 1} />}>
                <CardContentBox footer={(<FancyButton
                  style={{ height: '24px' }}
                  onClick={() => !enoughAllowanceForTier(tier) ? approveSpendUsdcForNFTHandler(tier) : buyNFTHandler(tier)}
                  loading={executionInProgress}
                  disabled={!injectedWalletConnected || executionInProgress || !enoughBalanceForTier(tier)}>
                  {!contractsLoaded ? 'Buy' :
                    !enoughBalanceForTier(tier) ? 'No balance' : !enoughAllowanceForTier(tier) ? 'Approve' : 'Buy'
                  }
                </FancyButton>)}>
                  {safeNFTBalance && (safeNFTBalance[tier]) && typeof (safeNFTBalance[tier]) == 'string' &&
                  safeNFTTotalSupply && (safeNFTTotalSupply[tier]) && typeof (safeNFTTotalSupply[tier]) == 'string'
                    ?
                  <Text color='#FFFFFF' size='xs'>${(parseInt(safeNFTTotalSupply[tier])==0 ? parseInt(safeNFTTotalSupply[tier]) : parseInt(safeNFTBalance[tier])/parseInt(safeNFTTotalSupply[tier])*100).toFixed(5)}% Ownership</Text> :
                  <Loader size='xs' color='#F5F5F5' />}

                  <FormattedAmount caption='Balance: ' price={!(safeNFTBalance) || safeNFTBalance[tier]} unit=''
                                   decimals={0} />


                  <FormattedAmount price={!(nftRegularPostPresalePrice) || nftRegularPostPresalePrice[tier]} crossed={true} />
                  <FormattedAmount price={!(nftDiscountedPrice) || nftDiscountedPrice[tier]} />
                </CardContentBox>
              </InfoCard>
            </Grid.Col>
          ))}
          <Grid.Col span={12} mt={'sm'}>
            <FormattedAmount caption='Balance: ' price={!(usdcBalance) || usdcBalance} />
          </Grid.Col>
          {referralAddress &&
            (<Grid.Col span={12} mt={'xs'}>
              <Text>Referral: <strong>{referralAddress}</strong></Text>
            </Grid.Col>)}

          <Grid.Col span={12} mt={'lg'}>
            <Title order={2}> Don’t know how our NFTs work? Read our Whitepaper</Title>
            <Link href={'https://safeyields.io/safeyields_whitepaper.pdf'} target='_blank' rel='noopener noreferrer'
                  passHref>
              <FancyButton mt={'20px'} py={10}>Read Whitepaper</FancyButton>
            </Link>
          </Grid.Col>
        </Grid>
      </PageContainer>
    );
  }
;

export default Nft;
Nft.getLayout = AppLayout;
