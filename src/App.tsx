import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { themes } from 'styles/themes';
import Routes from './routes';
import { DisplayProvider } from 'hooks/globalContext/GlobalContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <DisplayProvider>
        <Reset />
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </DisplayProvider>
    </ThemeProvider>
  );
};

export default React.memo(App);
