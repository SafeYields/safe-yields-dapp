import { Grid, Image, Text } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import type { NextPageWithLayout } from 'next';

import { AppLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Homepage'>
      <Grid>
        <Grid.Col span={4}>
          <Text sx={{ fontFamily: 'Gotham, sans-serif', lineHeight: '60px', fontSize: '45px' }}
                ta='left'
                mt='10rem'
                fw={700}>
            Safe<br />Investments<br />in DeFi
          </Text>
        </Grid.Col>
        <Grid.Col span={8}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            fit='fill'
            src='assets/background-abstraction.svg' />
        </Grid.Col>
      </Grid>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
