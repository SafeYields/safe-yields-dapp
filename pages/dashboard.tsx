import { Flex } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import useMetaMaskSafeTokenBalance from '../hooks/useMetaMaskSafeTokenBalance';
import useNetworkSafeTokenPrice from '../hooks/useNetworkSafeTokenPrice';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Flex gap={'md'} wrap={'wrap'}>
        <InfoCard header={'Safe Price'} feeder={useNetworkSafeTokenPrice} />
        <InfoCard header={'Your Safe Holdings'} feeder={useMetaMaskSafeTokenBalance} />
      </Flex>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
