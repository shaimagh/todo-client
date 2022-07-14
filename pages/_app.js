import '../styles/globals.css';
import * as React from 'react';
import { colors, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';

import { Navbar } from '../components';
import { queryClient } from '../queryClient';

const theme = createTheme({
  palette: {
    primary: colors.blue
  }
});

const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };

function MyApp({ Component, pageProps }) {
  const { push, pathname } = useRouter();

  const onLogout = React.useCallback(() => {
    localStorage.removeItem('token');
    queryClient.clear();
    push('/login');
  }, [push]);

  const canShowNavBar = React.useMemo(
    () => !pathname.startsWith('/login') && !pathname.startsWith('/register'),
    [pathname]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={anchorOrigin}
      >
        <QueryClientProvider client={queryClient}>
          <div>
            <CssBaseline />
            {canShowNavBar && <Navbar onLogout={onLogout} />}
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
