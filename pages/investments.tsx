import { Center, createStyles, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageContainer } from 'components/PageContainer';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';

type TableData = {
  investments: string;
  deposit: string;
  projectedApr: string;
  weight: string;
  weightedApr: string;
  withdrawn: string;
  pnl: string;
};

const tableData: TableData[] = [
  {
    investments: 'USD/EUR',
    deposit: '$0.00',
    projectedApr: '-',
    weight: '0%',
    weightedApr: '0%',
    withdrawn: '$0.00',
    pnl: '$0.00',
  },
  {
    investments: 'USD/GOLD',
    deposit: '$3,007.00',
    projectedApr: '110%',
    weight: '11.73%',
    weightedApr: '12.90%',
    withdrawn: '$0.00',
    pnl: '-$2,881.00',
  },
  {
    investments: 'UniV3 GMX/ETH (Arb)',
    deposit: '$2,026.17',
    projectedApr: '53.00%',
    weight: '6.41%',
    weightedApr: '3.40%',
    withdrawn: '$50.50',
    pnl: '-$1,975.67',
  },
  {
    investments: 'Ramses MAI/USDC (Arb)',
    deposit: '$2,500.00',
    projectedApr: '14.00%',
    weight: '7.91%',
    weightedApr: '1.11%',
    withdrawn: '',
    pnl: '-$2,500.00',
  },
  {
    investments: 'Ramses FRAX/USDC (Arb)',
    deposit: '$2,400.00',
    projectedApr: '12.00%',
    weight: '7.60%',
    weightedApr: '0.91%',
    withdrawn: '',
    pnl: '-$2,400.00',
  },
  {
    investments: 'Granary ETH/wstETH Loop (Arb)',
    deposit: '$4,984.14',
    projectedApr: '34.00%',
    weight: '15.78%',
    weightedApr: '5.36%',
    withdrawn: '',
    pnl: '-$4,984.14',
  },
  {
    investments: 'UniV3 BTC/ETH (OP)',
    deposit: '$4,705.69',
    projectedApr: '19.00%',
    weight: '14.90%',
    weightedApr: '2.83%',
    withdrawn: '$2,399.93',
    pnl: '-$2,305.76',
  },
  {
    investments: 'Forex Gold/USD bot',
    deposit: '$1,970.00',
    projectedApr: '90.00%',
    weight: '6.24%',
    weightedApr: '5.61%',
    withdrawn: '',
    pnl: '-$1,970.00',
  },
  {
    investments: 'Puto.Studio - SafeYields Ecosystem',
    deposit: '$3,192.00',
    projectedApr: '30.00%',
    weight: '10.11%',
    weightedApr: '3.03%',
    withdrawn: '',
    pnl: '-$3,192.00',
  },
  {
    investments: 'Costs',
    deposit: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    pnl: '',
  },
  {
    investments: 'Forex Bots',
    deposit: '$1,446.00',
    projectedApr: '-',
    weight: '-',
    weightedApr: '-',
    withdrawn: '$0.00',
    pnl: '-$1,446.00',
  },
  {
    investments: 'VPS (Forex Bots)',
    deposit: '$179.00',
    projectedApr: '-',
    weight: '-',
    weightedApr: '-',
    withdrawn: '$0.00',
    pnl: '-$179.00',
  },
  {
    investments: 'Gas fees 29/03/2023',
    deposit: '$46.87',
    projectedApr: '-',
    weight: '-',
    weightedApr: '-',
    withdrawn: '$0.00',
    pnl: '-$46.87',
  },
];
const total = [
  {
    investments: 'Total',
    deposit: '$31,588.31',
    projectedApr: '-',
    weight: '-',
    weightedApr: '30.38%',
    withdrawn: '$5,034.35',
    pnl: '-$26,553.96',
  },
];

const ths = (mobile?: boolean) => (
  <tr>
    <th>Investments</th>
    <th>Deposit</th>
    {!mobile && <th>Project APR</th>}
    {!mobile && <th>Portfolio Weight</th>}
    {!mobile && <th>Weighted APR</th>}
    <th>Withdrawn</th>
    <th>PnL</th>
  </tr>
);
const formatRows = (data: TableData[], mobile?: boolean) =>
  data.map((investment) => (
    <tr
      key={investment.investments}
      style={{ backgroundColor: investment.investments == 'Costs' ? '#9BAD98' : undefined }}
    >
      <td>{investment.investments}</td>
      <td>{investment.deposit}</td>
      {!mobile && <td>{investment.projectedApr}</td>}
      {!mobile && <td>{investment.weight}</td>}
      {!mobile && <td>{investment.weightedApr}</td>}
      <td>{investment.withdrawn}</td>
      <td>{investment.pnl}</td>
    </tr>
  ));

const useStyles = createStyles<string>((theme) => {
  return {
    investmentTable: {
      '& caption': {
        color: 'white',
      },
      '& thead': {
        '& tr': {
          '& th': {
            width: '120px',
            fontSize: '12px',
            textAlign: 'center',
            backgroundColor: theme.colors.mustardGreen[0],
            color: theme.colors.veryDarkGreen[0],
            padding: '10px 8px',
          },
        },
      },
      '& tfoot': {
        '& tr': {
          '& td': {
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: theme.colors.mustardGreen[0],
            color: theme.colors.veryDarkGreen[0],
            padding: '10px 0px',
          },
        },
      },
      '& tbody': {
        '& tr': {
          '& td': {
            textAlign: 'center',
            fontSize: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.24)',
            padding: '5px 8px',
          },
        },
      },
    },
  };
});
const Investments: NextPageWithLayout = () => {
  const { classes } = useStyles();
  const mobile = useMediaQuery('(max-width: 576px)');
  return (
    <PageContainer title='Investments'>
      <Stack justify={'center'} spacing={'md'} style={{ height: '50vh' }}>
        <Center>
          <Title order={5}>Coming Soon</Title>
        </Center>
      </Stack>

      {/* <Table*/}
      {/*  captionSide='top'*/}
      {/*  horizontalSpacing='sm'*/}
      {/*  verticalSpacing='sm'*/}
      {/*  withBorder*/}
      {/*  withColumnBorders*/}
      {/*  fontSize={'md'}*/}
      {/*  className={classes.investmentTable}*/}
      {/* >*/}
      {/*  <caption>*/}
      {/*    <Box*/}
      {/*      style={{*/}
      {/*        display: 'flex',*/}
      {/*        justifyContent: 'space-between',*/}
      {/*        alignItems: 'center',*/}
      {/*        flexDirection: mobile ? 'column' : 'row',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Link href='https://safeyields.medium.com/safeyields-treasury-portfolio-description-april-update-bf4a7937f675'>*/}
      {/*        <OulineButton>Check Treasury Strategy here.</OulineButton>*/}
      {/*      </Link>*/}
      {/*      <Text>*/}
      {/*        Treasury Performance (last 30 days): <span style={{ fontWeight: 800 }}>14%</span>*/}
      {/*      </Text>*/}
      {/*    </Box>*/}
      {/*  </caption>*/}
      {/*  <thead>{ths(mobile)}</thead>*/}
      {/*  <tbody>{formatRows(tableData, mobile)}</tbody>*/}
      {/*  <tfoot>{formatRows(total, mobile)}</tfoot>*/}
      {/* </Table>*/}
    </PageContainer>
  );
};

export default Investments;

Investments.getLayout = AppLayout;
