import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Avatar, createStyles, Group, Select, Text, useMantineTheme } from '@mantine/core';
import { SelectProps } from '@mantine/core/lib/Select/Select';
import { useWeb3React } from '@web3-react/core';
import { forwardRef } from 'react';
import { CaretDown } from 'tabler-icons-react';

import useTokenBalances from '../../hooks/useTokenBalances';
import { useImportedTokens, useSafeTokens, useTokens } from '../../hooks/useTokens';

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    chevron: {
      color: theme.colors.emeraldGreen[0],
    },
  };
});

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  logoURI: string;
  value: string;
  formattedBalance: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ logoURI, value, formattedBalance, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap style={{ backgroundColor: 'transparent' }} position={'apart'}>
        <Avatar src={logoURI} radius='xl' size='sm' />
        <Text size='sm' style={{ backgroundColor: 'transparent', color: others.color }}>
          {value}
        </Text>
        <Text size='sm' style={{ backgroundColor: 'transparent', color: others.color }}>
          {parseFloat(formattedBalance).toFixed(5)}
        </Text>
      </Group>
    </div>
  ),
);
SelectItem.displayName = 'SelectItem';

const SelectToken = ({
  selectedTokenAddress,
  onChange,
  safeList,
  ...otherProps
}: {
  selectedTokenAddress: string;
  onChange: (address: string) => void;
  safeList?: boolean;
} & Omit<SelectProps, 'data'>) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { chainId } = useWeb3React();

  const arbitrumTokens = useTokens();
  const safeTokens = useSafeTokens();
  const tokens = safeList ? safeTokens : arbitrumTokens;
  const { balances, loading } = useTokenBalances();
  const { removeToken } = useImportedTokens();

  // select

  const tokenWithBalances = [
    ...tokens
      .map((item) => {
        const balance = balances[item.address];
        const formattedBalance = formatUnits(balance || BigNumber.from(0), item.decimals);

        return {
          ...item,
          balance,
          formattedBalance,
          value: item.name,
          logoURI: item.logoURI,
          label: item.name,
        };
      })
      .sort((a, b) => parseFloat(b.formattedBalance) - parseFloat(a.formattedBalance)),
  ];
  const selectedToken = tokenWithBalances.find((d) => d.address === selectedTokenAddress);

  // if (!safeList)
  //   tokenWithBalances.unshift({
  //     ...NATIVE_TOKEN[chainId || 42161],
  //     balance: balances[NATIVE_TOKEN_ADDRESS],
  //     formattedBalance: formatUnits(balances[NATIVE_TOKEN_ADDRESS] || BigNumber.from(0), 18),
  //     value: NATIVE_TOKEN[chainId || 42161].name,
  //     logoURI: NATIVE_TOKEN[chainId || 42161].logoURI,
  //     label: NATIVE_TOKEN[chainId || 42161].name,
  //   });

  return (
    <Select
      size='lg'
      rightSection={<CaretDown className={classes.chevron} />}
      itemComponent={SelectItem}
      // defaultValue={safeList ? 'SAFE' : 'USDC'}
      value={selectedToken?.name}
      searchable
      styles={{ rightSection: { pointerEvents: 'none' } }}
      data={tokenWithBalances}
      onChange={(value) => {
        const token = tokenWithBalances.findIndex((d) => d.name === value);
        value && onChange(tokenWithBalances[token].address);
      }}
      icon={<Avatar src={selectedToken?.logoURI} radius='xl' size='sm' />}
      filter={(value, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
      {...otherProps}
    />
  );
};

export default SelectToken;
