import { Space,Stack, Text } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import type { NextPageWithLayout } from 'next';

import { DashboardLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Stack spacing='xl'>
        <Text sx={{ fontFamily: 'Gotham, sans-serif' }}
              ta='center'
              fz='xl'
              fw={700}>
          Safe Investments
        </Text>
        <Space />
        <Text sx={{ fontFamily: 'Gotham, sans-serif' }}
              ta='center'
              fz='xl'
              fw={700}>
          in DeFi
        </Text>

      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = DashboardLayout;
