import { Widget } from '@kyberswap/widgets';
import { useWeb3React } from '@web3-react/core';

import { PageContainer } from '../components/PageContainer';
import { AppLayout } from '../layout';

const darkTheme = {
  text: '#FFFFFF',
  subText: '#A9A9A9',
  primary: '#36676A',
  dialog: '#D9E022',
  secondary: '#0B1B03',
  interactive: '#0B1B03',
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
    <PageContainer title='safe'>
      <Widget
        theme={darkTheme}
        tokenList={[]}
        provider={provider}
        defaultTokenOut={chainId ? defaultTokenOut[chainId] : '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'}
      />
    </PageContainer>
  );
};

export default Safe;
Safe.getLayout = AppLayout;
