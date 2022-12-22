import { Flex } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Flex>
        <InfoCard />
      </Flex>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
