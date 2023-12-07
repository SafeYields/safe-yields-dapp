import { Title } from '@mantine/core';
import { FC } from 'react';

export const TierHeader: FC<{ tier: number }> = (props) => (
  <Title
    order={3}
    sx={(theme) => {
      return {
        color: theme.colors.mainCyan[0],
      };
    }}
  >
    {' '}
    Tier {props.tier}
  </Title>
);
