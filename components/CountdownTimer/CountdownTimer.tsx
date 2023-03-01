import { SimpleGrid, Text, Title } from '@mantine/core';
import { FC, useState } from 'react';

import useStyles from './CountdownTimer.styles';

export const CountdownTimer: FC<{ endDate: number }> = ({ endDate }) => {

  const { classes, cx } = useStyles();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timer = () => {
    const now = new Date().getTime();
    const t = endDate - now;

    const d = Math.floor(t / (1000 * 60 * 60 * 24));
    const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((t % (1000 * 60)) / 1000);

    setDays(d);
    setHours(h);
    setMinutes(m);
    setSeconds(s);

    if (t < 0) {
      clearInterval(interval);
    }
  };

  const interval = setInterval(timer, 1000);

  return (
    <SimpleGrid cols={3}>
      {
        [{ label: 'days', value: days },
          { label: 'hours', value: hours },
          { label: 'minutes', value: minutes }].map((item, index) => (
          <div className={classes.container} key={item.label}>
            <Title order={3} className={classes.number}>{item.value}</Title>
            <Text className={classes.label}>{item.label}</Text>
          </div>
        ))
      }
    </SimpleGrid>
  );

};
