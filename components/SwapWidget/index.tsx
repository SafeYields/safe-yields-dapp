import {
  Avatar,
  Box,
  createStyles,
  Flex,
  Group,
  Input,
  Select,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { forwardRef, useState } from 'react';
import { AdjustmentsHorizontal, CaretDown } from 'tabler-icons-react';

enum ModalType {
  SETTING = 'setting',
  CURRENCY_IN = 'currency_in',
  CURRENCY_OUT = 'currency_out',
  REVIEW = 'review',
  DEXES_SETTING = 'dexes_setting',
  IMPORT_TOKEN = 'import_token',
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  value: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap style={{ backgroundColor: 'transparent' }}>
        <Avatar src={image} radius='xl' />
        <Text size='sm' style={{ backgroundColor: 'transparent', color: others.color }}>
          {value}
        </Text>
      </Group>
    </div>
  ),
);
SelectItem.displayName = 'SelectItem';
const SwapWidget = () => {
  const useStyles = createStyles<string>((theme, params, getRef) => {
    return {
      wrapper: {
        position: 'absolute',
        top: '140px',
        borderRadius: '21px',
        padding: '27px',
        width: '438px',
        height: '515px',
        background:
          'linear-gradient(180deg, rgba(217, 217, 217, 0.32) 0%, rgba(217, 217, 217, 0.13) 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(3px)',
      },
      titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.25rem',
        fontWeight: 500,
        alignItems: 'center',
      },
      settings: {
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          color: 'orange',
        },
      },
      inputWrapper: {
        borderRadius: '7px',
        padding: '0.75rem',
        background: theme.colors.gray[0],
        marginTop: '1rem',
      },
      balanceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      balanceHeader: {
        marginLeft: '12px',
        color: theme.colors.emeraldGreen[0],
      },
      inputRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.75rem',
      },
      input: {
        input: {
          background: 'transparent',
          border: 'none',
          color: theme.colors.limeGreen[1],
          fontWeight: 700,
          fontSize: '20px',
        },
      },
      maxButton: {
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          color: 'orange',
        },
      },
      chevron: {
        color: theme.colors.emeraldGreen[0],
      },
    };
  });
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [showModal, setShowModal] = useState<ModalType | null>(null);

  // select
  const [value, setValue] = useState<string | null>(null);
  const [valueIndex, setValueIndex] = useState<number>(0);
  const data = [
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      value: 'USDC',
      label: 'USDC',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      value: 'Eth',
      label: 'Eth',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
      value: 'USDT',
      label: 'USDT',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
      value: 'USDs',
      label: 'USDs',
    },
  ];
  const handleChange = (value: string | null) => {
    setValue(value);
    setValueIndex(data.findIndex((d) => d.value === value));
  };

  // const {
  //   loading,
  //   error,
  //   tokenIn,
  //   tokenOut,
  //   setTokenIn,
  //   setTokenOut,
  //   inputAmout,
  //   setInputAmount,
  //   trade: routeTrade,
  //   slippage,
  //   setSlippage,
  //   getRate,
  //   deadline,
  //   setDeadline,
  //   allDexes,
  //   excludedDexes,
  //   setExcludedDexes,
  //   setTrade,
  // } = useSwap();

  const formattedTokenInBalance = parseFloat(
    parseFloat('21412.4275467564473632024').toPrecision(10),
  );
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.titleRow}>
        <Title order={3}>Swap</Title>
        <AdjustmentsHorizontal
          className={classes.settings}
          onClick={() => setShowModal(ModalType.SETTING)}
        />
      </Box>
      <Box className={classes.inputWrapper}>
        <Box className={classes.balanceRow}>
          <Text className={classes.balanceHeader}>From</Text>
          <Text className={classes.balanceHeader}>Balance: {formattedTokenInBalance}</Text>
        </Box>
        <Box className={classes.inputRow}>
          <Input className={classes.input} />
          <Flex gap='xs' justify='center' align='center'>
            <Text className={classes.maxButton}>Max.</Text>
            <Select
              size='lg'
              rightSection={<CaretDown className={classes.chevron} />}
              itemComponent={SelectItem}
              defaultValue='USDC'
              searchable
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={data}
              onChange={handleChange}
              icon={<Avatar src={data[valueIndex].image} radius='xl' />}
              filter={(value, item) =>
                item.value.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default SwapWidget;
