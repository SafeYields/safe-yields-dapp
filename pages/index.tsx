import { Stack } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import { PageContent } from 'components/PageContent';
import type { NextPageWithLayout } from 'next';

import { DashboardLayout } from '../layout';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Stack spacing='xl'>
        <PageContent outerTitle title='Homepage'>
          Safe Yields
        </PageContent>
      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = DashboardLayout;
