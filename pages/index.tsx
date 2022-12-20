import { Stack, Text } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import type { NextPageWithLayout } from 'next';

import { DashboardLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Stack spacing='xl'>
        {/* <PageContent outerTitle title='Homepage'>*/}
        <Text sx={{ fontFamily: 'Gotham, sans-serif' }}
              ta='center'
              fz='xl'
              fw={700}
              lineClamp={2}>
          Safe Investments in DeFi
        </Text>
        {/* </PageContent>*/}
      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = DashboardLayout;
