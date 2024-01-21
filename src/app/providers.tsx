'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  QueryCache,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { commonErrorHandler } from '@utils/error';
import { theme } from 'src/theme';

export default ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => commonErrorHandler(error),
    }),
    mutationCache: new MutationCache({
      onError: error => commonErrorHandler(error),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
