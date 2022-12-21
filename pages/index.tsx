import { Space,Stack, Text } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import type { NextPageWithLayout } from 'next';

import { AppLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Homepage'>
      <Stack spacing='xl'>
        <Text sx={{ fontFamily: 'Gotham, sans-serif' }}
              ta='center'
              fz='xl'
              mt='10rem'
              fw={700}>
          Safe
        </Text>
        <Space />
        <Text sx={{ fontFamily: 'Gotham, sans-serif' }}
              ta='center'
              fz='xl'
              fw={700}>
          Investments
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

Home.getLayout = AppLayout;
