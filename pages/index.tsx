import { Center, createStyles, Loader, Stack, Title } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import useNFTOfTreasury from 'hooks/useNFTOfTreasury';
import useNFTRewards from 'hooks/useNFTRewards';
import useSafeNFTBalance from 'hooks/useSafeNFTBalance';
import useSafeTokenBalance from 'hooks/useSafeTokenBalance';
import useWalletConnected from 'hooks/useWalletConnected';
import { HomeLayout } from 'layout/HomeLayout';
import type { NextPageWithLayout } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { DECIMALS_TO_DISPLAY } from '../config';
import useFetchFromApi from '../hooks/useFetchFromApi';

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    welcome: {
      [theme.fn.smallerThan('md')]: {
        fontSize: 36,
      },
      [theme.fn.smallerThan('sm')]: {
        fontSize: 32,
      },
    },
    title: {
      [theme.fn.smallerThan('md')]: {
        fontSize: 48,
      },
      [theme.fn.smallerThan('sm')]: {
        fontSize: 42,
      },
    },
    description: {
      [theme.fn.smallerThan('md')]: {
        fontSize: 13,
      },
      [theme.fn.smallerThan('sm')]: {
        fontSize: 11,
      },
    },
    tubes: {
      width: 'auto',
      objectFit: 'contain',
      position: 'absolute',
      opacity: 0.55,
      bottom: 0,
      height: '42vh',
      [theme.fn.smallerThan('md')]: {
        height: '38vh',
      },
      [theme.fn.smallerThan('sm')]: {
        height: '36vh',
      },
      objectPosition: '0 20px',
    },
  };
});

const Home: NextPageWithLayout = () => {
  const { classes, cx } = useStyles();
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
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_PRESALE_IS_ACTIVE?.toLowerCase() === 'true') {
    router.push('/nft');
  }
  return (
    <PageContainer title='Welcome'>
      <Stack justify={'center'} spacing={'md'} style={{ textAlign: 'center', flex: 1 }}>
        <Center style={{ zIndex: 0 }}>
          <Image
            role='presentation'
            src='/assets/bg_tubes.svg'
            width={400}
            height={400}
            alt='Tubes'
            className={cx([classes.tubes])}
          />
        </Center>
        <Center style={{ zIndex: 1 }}>
          <Title order={5} className={cx([classes.welcome])}>
            Welcome to
          </Title>
        </Center>
        <Center style={{ zIndex: 1 }}>
          <Title order={1} color='#4CFAC7' className={cx([classes.title])}>
            SafeYields DAO
          </Title>
        </Center>
        <Stack
          justify='center'
          spacing={3}
          style={{ zIndex: 1 }}
          className={cx([classes.description])}
        >
          <p style={{ color: '#F2ECE4', margin: 0 }}>
            A decentralized-one click solution for AI powered
          </p>
          <p style={{ color: '#F2ECE4', margin: 0 }}>
            trading on GMX and DeFi automated strategies.
          </p>
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = HomeLayout;
