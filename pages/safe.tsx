import {
  Box,
  Button,
  Group,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

import { CardInfo } from '../components/InfoCard/CardInfo';
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
  fontFamily: 'Inter, sans-serif',
  borderRadius: '25px',
  buttonRadius: '25px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
};

const defaultTokenOut = {
  42161: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  1337: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  421613: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
};

const Safe = () => {
  const { chainId, provider } = useWeb3React();
  const balance = 1234.56;
  const [amount, setAmount] = useState('');
  const [safeAmount, setSafeAmount] = useState(0);
  const [totalSafeBought, setTotalSafeBought] = useState(0);
  const totalSafeAvailable = 2000000;

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setAmount(value);

    const dollars = parseFloat(value);
    if (!isNaN(dollars)) {
      setSafeAmount(dollars * 1.1); // Calculate $SAFE based on $1 to $1.10 ratio
    } else {
      setSafeAmount(0);
    }
  };

  const handleBuyClick = () => {
    setTotalSafeBought((prevTotal) => prevTotal + safeAmount);
  };

  const progressValue = (totalSafeBought / totalSafeAvailable) * 100;

  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <PageContainer title='Safe'>
      <Stack align='center' spacing='sm'>
        <Title
          order={3}
          style={{
            fontFamily: safeTheme.fontFamily,
            color: '#6772b7',
            textAlign: isSmallScreen ? 'center' : 'left',
          }}
        >
          $SAFE Pre-sale is live!
        </Title>
        <Text
          size='xl'
          style={{ fontFamily: safeTheme.fontFamily, textAlign: isSmallScreen ? 'center' : 'left' }}
          weight={700}
        >
          2M $SAFE at 1$ for a 1.10$ launch price
        </Text>
        <CardInfo header>
          <Input.Wrapper label='Amount' size='xl' color='#FFFFF'>
            <Input
              radius='xl'
              rightSection='Max.'
              placeholder='Enter USDC amount'
              variant='unstyled'
              style={{
                borderRadius: '30px',
                backgroundColor: '#5d6c6a',
                color: '#FFFFFF',
                border: '1px solid #5d6c6a',
                padding: '10px',
                marginBottom: '20px',
                width: '100%',
                fontFamily: safeTheme.fontFamily,
              }}
              value={amount}
              onChange={handleInputChange}
              sx={{
                '::placeholder': {
                  color: '#FFFFFF', // White placeholder text
                },
              }}
            />
          </Input.Wrapper>
          <Group
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '20px',
            }}
          >
            <Stack justify='center' align='center' spacing='md'>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text>You will get </Text>
                <Text
                  style={{ marginLeft: '5px', color: 'rgb(76, 250, 199)', fontWeight: 'bolder' }}
                >
                  {safeAmount} $SAFE
                </Text>
              </Box>
              <Button
                variant='filled'
                radius='xl'
                size='md'
                w='200px'
                style={{ backgroundColor: '#6772b7' }}
                onClick={handleBuyClick}
              >
                Buy $SAFE
              </Button>
            </Stack>
          </Group>
        </CardInfo>
        <CardInfo header='Available $SAFE'>
          <Progress
            value={progressValue}
            color='#4cfac7'
            size='xl'
            radius='xl'
            style={{
              width: isSmallScreen ? '100%' : '50%',
              padding: '15px',
              margin: '10px',
              backgroundColor: '#5d6c6a',
            }}
          />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              width: isSmallScreen ? '100%' : '50%',
            }}
          >
            <Text style={{ marginLeft: '10px', fontWeight: '500' }}>{progressValue}</Text>
            <Text style={{ marginLeft: '5px', fontWeight: '500' }}>2M $SAFE</Text>
          </Box>
        </CardInfo>
        <Stack>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src='/assets/1-safe-coin.svg'
              alt='safe-yeilds'
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#4CFAC7',
              fontFamily: safeTheme.fontFamily,
              font: 'bold',
              marginTop: '10px',
            }}
            size='xl'
            weight={700}
          >
            Stack $SAFE
          </Text>
          <Text
            size='xl'
            weight={700}
            style={{
              display: 'flex',
              color: '#4CFAC7',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            and get
          </Text>

          <SimpleGrid
            cols={6}
            spacing='xs'
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px',
                padding: '30px',
                lineHeight: '18px',
                fontWeight: 500,
                borderRadius: '21px',
                background:
                  'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s ease-in-out',
              }}
            >
              Governance power over SafeYields
            </Box>

            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px',
                padding: '30px',
                lineHeight: '18px',
                fontWeight: 500,
                borderRadius: '21px',
                background:
                  'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s ease-in-out',
              }}
            >
              Early access to Emma AI up until launch
            </Box>

            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px',
                padding: '30px',
                lineHeight: '18px',
                fontWeight: 500,
                borderRadius: '21px',
                background:
                  'linear-gradient(180deg, rgba(217, 217, 217, 0.3) 0%, rgba(217, 217, 217, 0.3) 0.01%, rgba(217, 217, 217, 0.09) 100%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s ease-in-out',
              }}
            >
              Revenue share from protocol generates fees
            </Box>
          </SimpleGrid>
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default Safe;
Safe.getLayout = AppLayout;
