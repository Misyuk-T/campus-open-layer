import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { scroller } from 'react-scroll';
import { OptionType } from '@src/types/global.ts';
import { SelectField } from '@src/ui';

import {
  Box,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react';

interface DialogProps extends DrawerProps {
  title?: string;
  description?: string;
  hideDrawerClose?: boolean;
  options?: OptionType[];
}

const Drawer = ({
  title,
  description,
  options,
  hideDrawerClose,
  onClose,
  children,
  ...DrawerProps
}: DialogProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectChange = (option: OptionType | null) => {
    if (option) {
      setSelectedOption(option.value);
      scroller.scrollTo(option.value, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'drawerBody'
      });
    } else {
      setSelectedOption(null);
    }
  };

  return (
    <ChakraDrawer
      onClose={onClose}
      size={{ base: 'full', md: 'xl' }}
      placement='right'
      {...DrawerProps}
    >
      <DrawerOverlay />
      <DrawerContent bg='primary.150' mt={{ base: '78px', md: 0 }}>
        <IconButton
          onClick={onClose}
          position='absolute'
          variant='outlined'
          colorScheme='white'
          size={{ base: 'sm', sm: 'md', lg: 'lg' }}
          icon={<AiOutlineClose />}
          right={{ base: '15px', md: '18px' }}
          top={{ base: '15px', md: '18px' }}
          aria-label='close drawer'
          hidden={hideDrawerClose}
        />
        <DrawerHeader
          pb={0}
          pt={{ base: '50px', lg: '70px' }}
          px={{ base: '25px', sm: '30px', xl: '40px', '2xl': '60px' }}
        >
          <Flex
            justifyContent='space-between'
            gap={{ base: '20px', sm: '30px' }}
            flexWrap={{ base: 'wrap', sm: 'nowrap' }}
          >
            <Stack gap='10px' w='100%'>
              <Text textStyle='h2' as='h2' color='white'>
                {title}
              </Text>
              <Text textStyle='paragraphMedium' color='white' lineHeight='140%'>
                {description}
              </Text>
            </Stack>

            {options && (
              <Box
                flexShrink={0}
                width={{ base: '100%', sm: '160px', md: '200px', lg: '240px' }}
              >
                <SelectField
                  name='exampleSelect'
                  value={selectedOption}
                  options={options}
                  placeholder='Search'
                  onChange={handleSelectChange}
                />
              </Box>
            )}
          </Flex>
        </DrawerHeader>
        <DrawerBody
          id='drawerBody'
          mt='20px'
          py={0}
          px={{ base: '25px', sm: '30px', xl: '40px', '2xl': '60px' }}
          height='100%'
          overflowY='auto'
          overflowX='hidden'
        >
          {children}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
