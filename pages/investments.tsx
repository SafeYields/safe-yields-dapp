import { Box, createStyles, Table, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageContainer } from 'components/PageContainer';
import { AppLayout } from 'layout';
import type { NextPageWithLayout } from 'next';
import Link from 'next/link';

import { OulineButton } from '../components/OutlineButton';

type TableData = {
  investments: string;
  deposited: string;
  projectedApr: string;
  weight: string;
  weightedApr: string;
  withdrawn: string;
  profits: string;
  roi: string;
  pnl: string;
};

const tableData: TableData[] = [
  {
    investments: 'Forex Bots',
    deposited: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '',
  },
  {
    investments: 'USD/GOLD',
    deposited: '$3,007.00',
    projectedApr: '110%',
    weight: '11.73%',
    weightedApr: '12.90%',
    withdrawn: '$0.00',
    profits: '$126.00',
    roi: '4.19%',
    pnl: '-$2,881.00',
  },
  {
    investments: 'Yield Farming',
    deposited: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '',
  },
  {
    investments: 'ARB/ETH UniV3 (Arb)',
    deposited: '$3,238.35',
    projectedApr: '41%',
    weight: '12.63%',
    weightedApr: '5.18%',
    withdrawn: '$0.00',
    profits: '$146.14',
    roi: '4.51%',
    pnl: '-$3,092.21',
  },
  {
    investments: 'GMX/ETH UniV3 (Arb)',
    deposited: '$1,911.52',
    projectedApr: '62%',
    weight: '7.45%',
    weightedApr: '4.62%',
    withdrawn: '$1,804.20',
    profits: '$128.58',
    roi: '6.73%',
    pnl: '-$1,782.94',
  },
  {
    investments: 'GRAIN/ETH Chronos (Arb)',
    deposited: '$996.92',
    projectedApr: '275.00%',
    weight: '3.89%',
    weightedApr: '10.69%',
    withdrawn: '$0.00',
    profits: '$10.73',
    roi: '1.08%',
    pnl: '-$986.19',
  },
  {
    investments: 'wstETH Loop Granary (OP)',
    deposited: '$2,498.10',
    projectedApr: '56.00%',
    weight: '9.74%',
    weightedApr: '5.46%',
    withdrawn: '$0.00',
    profits: '$20.00',
    roi: '0.80%',
    pnl: '-$2,478.10',
  },
  {
    investments: 'SafeYields Management Loan',
    deposited: '$10,000.00',
    projectedApr: '12%',
    weight: '39.00%',
    weightedApr: '4.68%',
    withdrawn: '$0.00',
    profits: '$0.00',
    roi: '0.00',
    pnl: '-$10,000.00',
  },
  {
    investments: 'Real Business',
    deposited: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '',
  },
  {
    investments: 'Puto Studio - SY Ecosystem',
    deposited: '$3,192.00',
    projectedApr: '30%',
    weight: '12.45%',
    weightedApr: '3.73%',
    withdrawn: '$0.00',
    profits: '$0.00',
    roi: '0.00%',
    pnl: '-$3,192.00',
  },
  {
    investments: 'Costs',
    deposited: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '',
  },
  {
    investments: 'Bots',
    deposited: '$440.00',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '-$440.00',
  },
  {
    investments: 'VPS (Forex Bots)',
    deposited: '$179.00',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '-$179.00',
  },
  {
    investments: 'Gas Fees',
    deposited: '$195.52',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '-$195.52',
  },
  {
    investments: 'Exited Positions',
    deposited: '',
    projectedApr: '',
    weight: '',
    weightedApr: '',
    withdrawn: '',
    profits: '',
    roi: '',
    pnl: '',
  },
  {
    investments: 'WBTC/ETH UniV3 (Arb)',
    deposited: '$50.14',
    projectedApr: '0%',
    weight: '0.20%',
    weightedApr: '0%',
    withdrawn: '$4,769.63',
    profits: '$46.04',
    roi: '-0.09%',
    pnl: '-$4.10',
  },
  {
    investments: 'MAI/USDC Beefy (Arb)',
    deposited: '-$2.84',
    projectedApr: '0%',
    weight: '-0.01%',
    weightedApr: '0%',
    withdrawn: '$2,502.84',
    profits: '$24.00',
    roi: '1.07%',
    pnl: '$26.84',
  },
  {
    investments: 'FRAX/USDC Beefy (Arb)',
    deposited: '-$4.33',
    projectedApr: '0%',
    weight: '-0.02%',
    weightedApr: '0%',
    withdrawn: '$2,404.33',
    profits: '$17.00',
    roi: '0.89%',
    pnl: '$21.33',
  },
  {
    investments: 'ETH/wstETH Loop Granary (OP)',
    deposited: '-$99.61',
    projectedApr: '0%',
    weight: '-0.39%',
    weightedApr: '0%',
    withdrawn: '$17,371.53',
    profits: '$79.06',
    roi: '1.03%',
    pnl: '$178.67',
  },
  {
    investments: 'BTC/ETH UniV3 (OP)',
    deposited: '$41.43',
    projectedApr: '0%',
    weight: '0.16%',
    weightedApr: '0%',
    withdrawn: '$4,649.18',
    profits: '$61.50',
    roi: '0.43%',
    pnl: '$20.07',
  },
];
const total = [
  {
    investments: 'Total',
    deposited: '$25,643.20',
    projectedApr: '-',
    weight: '-',
    weightedApr: '47.26%',
    withdrawn: '-',
    profits: '$659.05',
    roi: '2.57%',
    pnl: '-$24,984.15',
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
    {!mobile && <th>Realized Profits</th>}
    {!mobile && <th>ROI</th>}
    <th>PnL</th>
  </tr>
);
const formatRows = (data: TableData[], mobile?: boolean) =>
  data.map((investment) => (
    <tr
      key={investment.investments}
      style={{
        backgroundColor:
          !investment.deposited &&
          !investment.projectedApr &&
          !investment.pnl &&
          !investment.weight &&
          !investment.weightedApr
            ? '#9BAD98'
            : undefined,
      }}
    >
      <td>{investment.investments}</td>
      <td>{investment.deposited}</td>
      {!mobile && <td>{investment.projectedApr}</td>}
      {!mobile && <td>{investment.weight}</td>}
      {!mobile && <td>{investment.weightedApr}</td>}
      <td>{investment.withdrawn}</td>
      {!mobile && <td>{investment.profits}</td>}
      {!mobile && <td>{investment.roi}</td>}
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
            [theme.fn.smallerThan('sm')]: {
              fontSize: '10px',
            },
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
            [theme.fn.smallerThan('sm')]: {
              fontSize: '10px',
            },
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
      <Table
        captionSide='top'
        horizontalSpacing='sm'
        verticalSpacing='sm'
        withBorder
        withColumnBorders
        fontSize={'md'}
        className={classes.investmentTable}
      >
        <caption>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: mobile ? 'column' : 'row',
            }}
          >
            <Link href='https://safeyields.medium.com/safeyields-treasury-portfolio-description-april-update-bf4a7937f675'>
              <OulineButton>Check Treasury Strategy here.</OulineButton>
            </Link>
            <Text style={{ marginTop: mobile ? '10px' : undefined }}>
              Treasury Performance (last 30 days): <span style={{ fontWeight: 800 }}>32%</span>
            </Text>
          </Box>
        </caption>
        <thead>{ths(mobile)}</thead>
        <tbody>{formatRows(tableData, mobile)}</tbody>
        <tfoot>{formatRows(total, mobile)}</tfoot>
      </Table>
    </PageContainer>
  );
};

export default Investments;

Investments.getLayout = AppLayout;
