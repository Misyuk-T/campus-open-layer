import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { GlobalDialogs, MapComponent } from '@src/components';
import { Navigation } from '@src/components';
import { store } from '@src/store';
import { theme } from '@src/styles';
import { ScrollBar } from '@src/ui';

import { ChakraProvider, Container, Flex, VStack } from '@chakra-ui/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ScrollBar maxHeight='100vh'>
            <Container
              width='100%'
              maxWidth='100vw'
              minH='100vh'
              overflowX='hidden'
              p={0}
              display='flex'
              flexDirection='column'
              // iOS fix
              minHeight='-webkit-fill-available'
              maxHeight='-webkit-fill-available'
              overflowY='hidden'
            >
              <Helmet>
                <meta
                  name='viewport'
                  content='width=device-width, initial-scale=1, maximum-scale=1'
                />
              </Helmet>
              <VStack flex='1' gap={0} width='100%' h='100%' overflowY='hidden'>
                <Flex
                  flex={1}
                  w='100%'
                  h='100%'
                  flexDirection={{ base: 'column', md: 'row' }}
                  overflowY='hidden'
                >
                  <Navigation />
                  <MapComponent />
                </Flex>

                <GlobalDialogs />
              </VStack>
            </Container>
          </ScrollBar>
        </ChakraProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
