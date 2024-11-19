import { Provider } from 'react-redux';
import { GlobalDialogs, MapComponent } from '@src/components';
import { Navigation } from '@src/components';
import { store } from '@src/store';
import { theme } from '@src/styles';

import { ChakraProvider, Container, Flex, VStack } from '@chakra-ui/react';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Container
          width='100%'
          minH='100vh'
          p={0}
          display='flex'
          flexDirection='column'
          maxW='none'
        >
          <VStack flex='1' gap={0} width='100%' h='100%'>
            <Flex
              flex={1}
              w='100%'
              h='100%'
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Navigation />
              <MapComponent />
            </Flex>

            <GlobalDialogs />
          </VStack>
        </Container>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
