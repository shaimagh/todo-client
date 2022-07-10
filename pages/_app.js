import '../styles/globals.css';
import * as React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Navbar } from '../components';

const queryClient = new QueryClient();

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
