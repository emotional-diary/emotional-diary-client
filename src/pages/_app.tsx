import { AppProps } from 'next/app';

import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>Emotional Diary</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
