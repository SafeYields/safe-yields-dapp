import { Group, Stack } from '@mantine/core';
import { PageContainer } from 'components/PageContainer';
import { PageContent } from 'components/PageContent';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

const Home: NextPageWithLayout = () => {
  return (
    <PageContainer title='Dashboard'>
      <Stack spacing='xl'>
        <PageContent outerTitle title='Foo!'>
          Foo
        </PageContent>
        <Group grow>
          <PageContent title='Bar!'>Bar</PageContent>
          <PageContent title='Baz!'>Baz</PageContent>
        </Group>
      </Stack>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
