import { Loader, Text } from '@mantine/core';
import { FC } from 'react';


export const FormatBalance: FC<{ balance: string | null | undefined | boolean }> = (props) =>
  props.balance && typeof (props.balance) == 'string' ?
    <Text color='#FFFFFF'>Balance: <Text span
                                         style={{ fontWeight: 700 }}>{(parseInt(props.balance)).toFixed(0)}</Text></Text> :
    <Loader size='xs' color='#F5F5F5' />;

