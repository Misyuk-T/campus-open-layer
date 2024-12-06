import { useEffect } from 'react';
import { GlobalDialogs, MapComponent } from '@src/components';
import { Navigation } from '@src/components';
import { getSideMenu } from '@src/store/actions/sideMenu.ts';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { Loader, ScrollBar } from '@src/ui';

import { Container, Flex, VStack } from '@chakra-ui/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.sideMenu);

  useEffect(() => {
    dispatch(getSideMenu());
  }, [dispatch]);

  return (
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

        {isLoading && <Loader fixed />}
      </Container>
    </ScrollBar>
  );
};

export default App;
