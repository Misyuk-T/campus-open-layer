import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from '@src/App.tsx';
import { store } from '@src/store';
import { theme } from '@src/styles';

import { ChakraProvider } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Helmet>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, maximum-scale=1'
            />
          </Helmet>
          <App />
        </ChakraProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
