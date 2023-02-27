import { Loader, Text } from '@mantine/core';
import { FC } from 'react';

import { DECIMALS_TO_DISPLAY } from '../../config';


export const FormattedAmount: FC<{ price: string | null | undefined | boolean, crossed?: boolean, caption?: string, unit?: string, decimals?: number, color?: string }> = (props) =>
  props.price && typeof (props.price) == 'string' ?
    <Text color={props.color ?? '#FFFFFF'}
          td={props.crossed ? 'line-through' : undefined}>{props.caption}{(parseFloat(props.price)).toFixed(props.decimals ?? DECIMALS_TO_DISPLAY)}
      <Text span
            style={{ fontWeight: 700 }}>{`  ${props.unit ?? '$USDC'}`} </Text></Text> :
    <Loader size='xs' color='#F5F5F5' />;

