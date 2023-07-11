'use client';

import { ThemeProvider } from 'styled-components';

import { theme } from 'src/theme';

export default ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
