import { Center, Stack, Title } from '@mantine/core';
import { useWeb3React } from '@web3-react/core';

import { PageContainer } from '../components/PageContainer';
import { AppLayout } from '../layout';

const safeTheme = {
  text: '#D9E022',
  subText: '#FFFFFF',
  primary: '#1A3F37',
  dialog: 'transparent',
  secondary: '#2D5242',
  interactive: '#E6A21D',
  stroke: '#CBDA49',
  accent: '#D9E022',
  success: '#189470',
  warning: '#FF9901',
  error: '#F28705',
  fontFamily: 'Space Grotesk',
  borderRadius: '25px',
  buttonRadius: '25px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
};

const defaultTokenOut: { [chainId: number]: string } = {
  42161: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  1337: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  421613: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
};

const Safe = () => {
  const { chainId, provider } = useWeb3React();
  return (
    // <PageContainer title='safe'>
    //   <Flex justify='center' align='center'>
    //     <TokenListProvider tokenList={[]}>
    //       <SwapWidget />
    //     </TokenListProvider>
    //   </Flex>
    // </PageContainer>

    <PageContainer title='Welcome'>
      <Stack justify={'center'} spacing={'md'} style={{ height: '50vh' }}>
        <Center>
          <Title order={5}>Coming Soon</Title>
        </Center>
      </Stack>
    </PageContainer>
  );
};

export default Safe;
Safe.getLayout = AppLayout;
