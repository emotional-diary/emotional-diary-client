import { headers } from 'next/headers';

export const absoluteUrl = () => {
  const prod = process.env.NODE_ENV === 'production';
  const protocol = prod ? 'https' : 'http';
  const host = headers().get('x-forwarded-host') || headers().get('host');

  return {
    protocol,
    host,
    origin: `${protocol}://${host}`,
  };
};
