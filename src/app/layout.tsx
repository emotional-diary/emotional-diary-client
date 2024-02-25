import StyledComponentsRegistry from '../lib/registry';

import Providers from './providers';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="description"
          content="An online diary where AI analyzes emotions."
        />
        <meta
          name="keywords"
          content="Onedoit, Emotional Diary, Ai, online diary, web diary, diary app"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>원두잇</title>

        <link rel="manifest" href="/manifest.json" />

        {/* 브라우저 테마 */}
        <meta name="theme-color" content="#94B49F" />

        {/* 파비콘 */}
        <link
          href="/images/favicons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/favicons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
