import { Box, createStyles, Table, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { PageContainer } from 'components/PageContainer';
import spreadsheetReader from 'g-sheets-api';
import { AppLayout } from 'layout';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPageWithLayout } from 'next';
import Link from 'next/link';
import { DetailedHTMLProps, Fragment, HTMLAttributes } from 'react';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';

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

const ths = (mobile?: boolean) => (
  <tr>
    <th>Investments</th>
    <th>Deposit</th>
    <th>Project APR</th>
    <th>Portfolio Weight</th>
    <th>Weighted APR</th>
    <th>Withdrawn</th>
    <th>Realized Profits</th>
    <th>ROI</th>
    {/* <th>PnL</th> */}
  </tr>
);

const CollapsibleIcon = ({ collapsed }: { collapsed?: boolean }) => (
  <Box w={14} h={14} pos='absolute' left={2} top={0} bottom={0} right={0} my='auto'>
    {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
  </Box>
);

const TableRow = ({
  rowData,
  trProps,
  mobile,
  collapsible,
  collapsed,
}: {
  rowData: TableData;
  mobile?: boolean;
  trProps?: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
  collapsible?: boolean;
  collapsed?: boolean;
}) => (
  <tr
    key={rowData.investments}
    {...trProps}
    style={{
      position: 'relative',
      backgroundColor:
        !rowData.deposited &&
        !rowData.projectedApr &&
        !rowData.pnl &&
        !rowData.weight &&
        !rowData.weightedApr
          ? '#9BAD98'
          : undefined,
      ...trProps?.style,
    }}
  >
    <td>
      {collapsible ? <CollapsibleIcon collapsed={collapsed} /> : null}
      {rowData.investments}
    </td>
    <td>{rowData.deposited}</td>
    <td>{rowData.projectedApr}</td>
    <td>{rowData.weight}</td>
    <td>{rowData.weightedApr}</td>
    <td>{rowData.withdrawn}</td>
    <td>{rowData.profits}</td>
    <td>{rowData.roi}</td>
    {/* <td>{rowData.pnl}</td> */}
  </tr>
);

const Rows = ({ data, mobile }: { data: TableData[]; mobile?: boolean }) => (
  <Fragment>
    {data.map((investment, index) => (
      <TableRow rowData={investment} mobile={mobile} key={investment.investments} />
    ))}
  </Fragment>
);

const CollapsedRows = ({ data, mobile }: { data: TableData[]; mobile?: boolean }) => {
  const [open, { toggle }] = useDisclosure();
  const titleRow = data?.[0] ?? {};
  const remainingRows = data.slice(1);

  return (
    <>
      <TableRow
        rowData={titleRow}
        mobile={mobile}
        collapsible
        collapsed={!open}
        trProps={{
          'aria-expanded': open,
          role: 'button',
          onClick: toggle,
          style: {
            cursor: 'pointer',
          },
        }}
      />

      {remainingRows.map((investment) => (
        <TableRow
          rowData={investment}
          mobile={mobile}
          key={investment.investments}
          trProps={{
            role: 'row',
            'aria-hidden': !open,
            style: {
              display: open ? undefined : 'none',
            },
          }}
        />
      ))}
    </>
  );
};

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
            padding: '5px 10px',
            textShadow: '1px 1px 3px #000',
          },
        },
      },
    },
  };
});

const trimProperties = (sheet: any[]) => {
  const trimmed: any[] = [];

  sheet.forEach((row) => {
    const keys = Object.keys(row);
    const trimmedRow: Record<string, any> = {};
    for (const key of keys) {
      trimmedRow[key.trim()] = row[key];
    }
    trimmed.push(trimmedRow);
  });
  return trimmed;
};

const mapSheetToTableData = (sheet: any[]): TableData[] => {
  const trimmedSheet = trimProperties(sheet);
  return trimmedSheet.map((row) => ({
    investments: row['Investments'] ?? '',
    deposited: row['Deposited ($)'] ?? '',
    pnl: row['PnL'] ?? '',
    profits: row['Realized Profits'] ?? '',
    projectedApr: row['Projected APR'] ?? '',
    roi: row['ROI %'] ?? '',
    weight: row['Portfolio Weight'] ?? '',
    weightedApr: row['Weighted APR'] ?? '',
    withdrawn: row['Withdrawn'] ?? '',
  }));
};

interface SheetData {
  tableData: TableData[];
  costRows: TableData[];
  exitedPositionRows: TableData[];
  total: TableData[];
}

type PageProps = SheetData & { lastMonthPerformance?: string };

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const sheetId = process.env.NEXT_PUBLIC_INVESTMENT_POOL_SPREADSHEET_ID;
  const invesmentsSheetName = process.env.NEXT_PUBLIC_INVESTMENT_POOL_SPREADSHEET_PAGE_NAME;
  const performanceSheetName = process.env.NEXT_PUBLIC_INVESTMENT_POOL_RESULT_PAGE_NAME;
  const apiKey = process.env.NEXT_PUBLIC_SPREADSHEETS_API_KEY;

  let sheetData: SheetData = {
    tableData: [],
    costRows: [],
    exitedPositionRows: [],
    total: [],
  };

  let lastMonthPerformance = '--';

  if (!sheetId || !apiKey || !invesmentsSheetName || !performanceSheetName) {
    return { props: { ...sheetData, lastMonthPerformance } };
  }

  const investmentsSheetOptions = {
    apiKey,
    sheetId,
    sheetName: invesmentsSheetName,
  };

  const investmentsPromise = new Promise((resolve, reject) => {
    spreadsheetReader(
      investmentsSheetOptions,
      (data: any[]) => {
        const mappedTableData = mapSheetToTableData(data);
        const costRowsStartIndex = mappedTableData.findIndex(
          (c: TableData) => c.investments === 'Costs',
        );
        const exitedPositionStartIndex = mappedTableData.findIndex(
          (c: TableData) => c.investments === 'Exited Positions',
        );

        sheetData = {
          tableData: mappedTableData.slice(0, costRowsStartIndex),
          costRows: mappedTableData.slice(costRowsStartIndex, exitedPositionStartIndex),
          exitedPositionRows: mappedTableData.slice(
            exitedPositionStartIndex,
            mappedTableData.length - 1,
          ),
          total: mappedTableData.slice(-1),
        };
        resolve(null);
      },
      (error: any) => {
        reject(error);
      },
    );
  });

  const performanceSheetOptions = {
    apiKey,
    sheetId,
    sheetName: performanceSheetName,
  };

  const performancePromise = new Promise((resolve, reject) => {
    spreadsheetReader(
      performanceSheetOptions,
      (data: any[]) => {
        const lastRowWithAPR = data.filter((row) => !!row.APR).pop();
        lastMonthPerformance = lastRowWithAPR.APR;
        resolve(null);
      },
      (error: any) => {
        reject(error);
      },
    );
  });

  await Promise.allSettled([investmentsPromise, performancePromise]);
  return { props: { ...sheetData, lastMonthPerformance } };
};

const Investments: NextPageWithLayout<SheetData> = ({
  costRows,
  exitedPositionRows,
  tableData,
  total,
  lastMonthPerformance,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes } = useStyles();
  const mobile = useMediaQuery('(max-width: 1023px)');
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
              alignItems: mobile ? 'flex-start' : 'center',
              flexDirection: mobile ? 'column' : 'row',
            }}
          >
            <Link href='https://safeyields.medium.com/safeyields-treasury-portfolio-description-april-update-bf4a7937f675'>
              <OulineButton>Check Treasury Strategy here.</OulineButton>
            </Link>
            <Text style={{ marginTop: mobile ? '10px' : undefined }}>
              Treasury Performance (last 30 days):{' '}
              <span style={{ fontWeight: 800 }}>{lastMonthPerformance ?? '--'}</span>
            </Text>
          </Box>
        </caption>
        <thead>{ths(mobile)}</thead>
        <tbody>
          <Rows data={tableData} mobile={mobile} />
          <CollapsedRows data={costRows} mobile={mobile} />
          <CollapsedRows data={exitedPositionRows} mobile={mobile} />
        </tbody>
        <tfoot>
          <Rows data={total} mobile={mobile} />
        </tfoot>
      </Table>
    </PageContainer>
  );
};

export default Investments;

Investments.getLayout = AppLayout;
