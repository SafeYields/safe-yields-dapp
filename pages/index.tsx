import { Flex, Loader, Table } from '@mantine/core';
import { InfoCard } from 'components/InfoCard';
import { PageContainer } from 'components/PageContainer';
import useMetaMaskSafeTokenBalance from 'hooks/useMetaMaskSafeTokenBalance';
import useSafeTokenPrice from 'hooks/useSafeTokenPrice';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

import useSafeNFTFairPrice from '../hooks/useSafeNFTFairPrice';
import useSafeTokenAPR from '../hooks/useSafeTokenAPR';

const Home: NextPageWithLayout = () => {
  const { data: fairPrice } = useSafeNFTFairPrice();
  return (
    <PageContainer title='Dashboard' background='assets/background-abstraction.svg'>
      <Flex gap={'xl'} wrap={'wrap'}>
        <InfoCard header={'Safe Price'}>
          <h1>{useSafeTokenPrice().data?.concat(' $') ?? <Loader size='lg' color='green' />}</h1>
        </InfoCard>
        <InfoCard header={'Safe NFT Fair Price'}>
          {fairPrice ?
            <Table fontSize={'xl'}  highlightOnHover>
              <thead>
              <tr>
                <th>Tier</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>
              {fairPrice.map((price, tier) =>
                <tr key={tier}>
                  <td>{tier+1}</td>
                  <td>{price.concat(' $')}</td>
                </tr>,
              )}
              </tbody>
            </Table>
            : <Loader size='lg' color='green' />}
        </InfoCard>
        <InfoCard header={'Safe APR'}>
          <h1>{useSafeTokenAPR().data?.concat(' %') ?? <Loader size='lg' color='green' />}</h1>
        </InfoCard>
        <InfoCard header={'NFTs APR'}>
          <Loader size='lg' color='red' />
        </InfoCard>
        <InfoCard header={'Your Safe Holdings'}>
          <h1>{useMetaMaskSafeTokenBalance().data?.concat(' $') ?? <Loader size='lg' color='green' />}</h1>
        </InfoCard>
        <InfoCard header={'Your NFTs'}>
          <h1>{useMetaMaskSafeTokenBalance().data ?? <Loader size='lg' color='green' />}</h1>
        </InfoCard>
        <InfoCard header={'Pending Rewards'}>
          <h1>{useMetaMaskSafeTokenBalance().data ?? <Loader size='lg' color='green' />}</h1>
        </InfoCard>
      </Flex>
    </PageContainer>
  );
};

export default Home;

Home.getLayout = AppLayout;
