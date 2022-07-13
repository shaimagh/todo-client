import '../styles/globals.css';
import * as React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';

import { Navbar } from '../components';
import { queryClient } from '../queryClient';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  const { push } = useRouter();

  const onLogout = React.useCallback(() => {
    localStorage.removeItem('token');
    queryClient.clear();
    push('/login');
  }, [push]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div>
          <CssBaseline />
          <Navbar onLogout={onLogout} />
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
