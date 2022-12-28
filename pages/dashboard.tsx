import { Flex } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import useNetworkSafeTokenPrice from '../hooks/useNetworkSafeTokenPrice';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Flex>
        <InfoCard header={'$SAFE Price'} feeder={useNetworkSafeTokenPrice} />
      </Flex>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
