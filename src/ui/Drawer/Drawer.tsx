import {
  cloneElement,
  isValidElement,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { OptionType } from '@src/types/global.ts';
import { HtmlContent, ScrollBar, SelectField } from '@src/ui';
import { debounce } from '@src/utils/helpers.ts';

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
  withScroll?: boolean;
  children: ReactElement<{ maxHeight?: number }>;
}

const Drawer = ({
  title,
  description,
  options,
  hideDrawerClose,
  onClose,
  children,
  isOpen,
  withScroll = true,
  ...drawerProps
}: DialogProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const ref = useRef(null);

  const isOptionsExist = options && options?.length > 0;

  const handleClose = () => {
    onClose();
    setSelectedOption('');
  };

  const handleSelectChange = (option: OptionType | null) => {
    if (option) {
      setSelectedOption(option.value);
    } else {
      setSelectedOption('');
    }
  };

  const calculateMaxHeight = () => {
    const drawerBody = document.getElementById('drawerBody');
    if (drawerBody) {
      const drawerBodyTop = drawerBody.getBoundingClientRect().top;
      const availableHeight = window.innerHeight - drawerBodyTop;
      setMaxHeight(availableHeight);
    }
  };

  const debouncedCalculateHeight = debounce(calculateMaxHeight, 0);

  const renderChildrenWithProps = () => {
    if (isValidElement(children)) {
      return cloneElement(children, { maxHeight });
    }
    return children;
  };

  useEffect(() => {
    window.addEventListener('resize', debouncedCalculateHeight);
    return () => {
      window.removeEventListener('resize', debouncedCalculateHeight);
    };
  }, [debouncedCalculateHeight]);

  useLayoutEffect(() => {
    if (isOpen) {
      debouncedCalculateHeight();
    }
  }, [isOpen]);

  return (
    <ChakraDrawer
      onClose={handleClose}
      size={{ base: 'full', md: 'xl' }}
      placement='right'
      isOpen={isOpen}
      {...drawerProps}
    >
      <DrawerOverlay />
      <DrawerContent bg='primary.150' mt={{ base: '78px', md: 0 }}>
        <IconButton
          onClick={handleClose}
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
              {description && (
                <Text
                  textStyle='paragraphMedium'
                  lineHeight='140%'
                  color='white'
                  as='div'
                >
                  <HtmlContent content={description} />
                </Text>
              )}
            </Stack>

            {isOptionsExist && (
              <Box
                flexShrink={0}
                width={{ base: '100%', sm: '160px', md: '200px', lg: '240px' }}
              >
                <SelectField
                  name='exampleSelect'
                  value={selectedOption}
                  options={options}
                  isSearchable={false}
                  placeholder='Search'
                  onChange={handleSelectChange}
                />
              </Box>
            )}
          </Flex>
        </DrawerHeader>

        <DrawerBody
          ref={ref}
          id='drawerBody'
          mt='20px'
          p={0}
          overflowX='hidden'
          overflowY='hidden'
        >
          {withScroll ? (
            <ScrollBar
              maxHeight={maxHeight ? `${maxHeight}px` : 'auto'}
              classToScroll={selectedOption}
            >
              <Flex
                px={{ base: '25px', sm: '30px', xl: '40px', '2xl': '60px' }}
                overflowX='hidden'
              >
                {renderChildrenWithProps()}
              </Flex>
            </ScrollBar>
          ) : (
            <Flex
              maxHeight={maxHeight ? `${maxHeight}px` : 'auto'}
              overflow='hidden'
            >
              {renderChildrenWithProps()}
            </Flex>
          )}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
