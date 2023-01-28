import { Loader, Text } from '@mantine/core';
import { FC } from 'react';

import { DECIMALS_TO_DISPLAY } from '../../config';


export const FormatPrice: FC<{ price: string | null | undefined | boolean, unit?: string }> = (props) =>
  props.price && typeof (props.price) == 'string' ?
    <Text color='#FFFFFF'>{(parseInt(props.price)).toFixed(DECIMALS_TO_DISPLAY)} <Text span
                                                                                  style={{ fontWeight: 700 }}>{`  ${props.unit ?? '$USDC'}`} </Text></Text> :
    <Loader size='xs' color='#F5F5F5' />;

