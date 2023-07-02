import { Typography } from '@components/typography';

export const ValidationMessage = ({ message }: { message: string }) => (
  <Typography
    variant={'body4'}
    color={'error.main'}
    style={{ marginBottom: '10px', paddingLeft: '10px' }}
  >
    {message}
  </Typography>
);
