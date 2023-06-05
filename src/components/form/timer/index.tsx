import { Typography } from '@components/typography';
import React from 'react';

export const Timer = ({
  callback,
  count = 180,
  reset = false,
}: {
  callback: () => void;
  count?: number;
  reset?: boolean;
}) => {
  const [seconds, setSeconds] = React.useState(count);

  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  React.useEffect(() => {
    setSeconds(count);

    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      callback();
      clearInterval(interval);
    }, count * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reset]);

  if (!seconds) {
    return null;
  }

  return (
    <Typography
      variant={'h5'}
      color={'gray.dark'}
      style={{ marginTop: '10px', paddingLeft: '10px' }}
    >
      만료 시간 : {minutes ? `${minutes}분` : ''}{' '}
      {secondsLeft ? `${secondsLeft}초` : ''}
    </Typography>
  );
};
