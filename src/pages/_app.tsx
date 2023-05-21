import Head from 'next/head';
import '../styles/globals.css';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="An online diary where AI analyzes emotions."
        />
        <meta
          name="keywords"
          content="Emotional Diary, Ai, online diary, web diary, diary app"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>

        <title>Emotional Diary</title>

        <link rel="manifest" href="/manifest.json" />

        {/* 파비콘 */}
        <link
          href="/images/favicons/favicon-16x16.ico"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/favicons/favicon-32x32.ico"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />

        {/* 스플래시 */}
        <link
          href="/images/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />

        {/* 브라우저 테마 */}
        <meta name="theme-color" content="#2B625B" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
