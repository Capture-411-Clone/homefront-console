'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default function TanStackProvider({ children }: { children: ReactNode }) {
  TimeAgo.addDefaultLocale(en);

  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
