import { createStyles, Table } from '@mantine/core';
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
    investments: 'UniV3 BTC/ETH (Arb)',
    deposit: '$4,850.74',
    projectedApr: '21.00%',
    weight: '15.36%',
    weightedApr: '3.22%',
    withdrawn: '$2,534.57',
    pnl: '-$2,316.17',
  },
  {
    investments: 'UniV3 ARB/ETH (Arb)',
    deposit: '$3,287.70',
    projectedApr: '47.00%',
    weight: '10.41%',
    weightedApr: '4.89%',
    withdrawn: '$49.35',
    pnl: '-$3,238.35',
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

const ths = (
  <tr>
    <th>Investments</th>
    <th>Deposit</th>
    <th>Project APR</th>
    <th>Portfolio Weight</th>
    <th>Weighted APR</th>
    <th>Withdrawn</th>
    <th>PnL</th>
  </tr>
);
const formatRows = (data: TableData[]) =>
  data.map((investment) => (
    <tr key={investment.investments}>
      <td>{investment.investments}</td>
      <td>{investment.deposit}</td>
      <td>{investment.projectedApr}</td>
      <td>{investment.weight}</td>
      <td>{investment.weightedApr}</td>
      <td>{investment.withdrawn}</td>
      <td>{investment.pnl}</td>
    </tr>
  ));

const useStyles = createStyles<string>((theme) => {
  return {
    investmentTable: {
      '& caption': {
        color: 'white',
        fontSize: '1rem',
      },
      '& thead': {
        '& th': {
          backgroundColor: theme.colors.mustardGreen[0],
          color: theme.colors.veryDarkGreen[0],
        },
      },
      '& tbody': {
        '& tr': {
          '& td': {
            backgroundColor: 'rgba(255, 255, 255, 0.24)',
          },
        },
      },
    },
  };
});
const Investments: NextPageWithLayout = () => {
  const { classes } = useStyles();
  return (
    <PageContainer title='Investments'>
      <Table
        captionSide='top'
        striped
        highlightOnHover
        withBorder
        withColumnBorders
        fontSize={'md'}
        className={classes.investmentTable}
      >
        <caption>Treasury Performance (last 30 days): 14%</caption>
        <thead>{ths}</thead>
        <tbody>{formatRows(tableData)}</tbody>
        <tfoot>{formatRows(total)}</tfoot>
      </Table>
    </PageContainer>
  );
};

export default Investments;

Investments.getLayout = AppLayout;
