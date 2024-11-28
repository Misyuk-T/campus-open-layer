import { useEffect, useState } from 'react';
import { LiaPlusSolid } from 'react-icons/lia';
import Slider from 'react-slick';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setActiveLocation } from '@src/store/reducers/locations';
import { openModalByType } from '@src/store/reducers/modals';
import { SidebarChildrenItem } from '@src/types/global';
import { SIDEBAR_WIDTH } from '@src/utils/constants';

import {
  Box,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

interface OffCampusProps {
  items: SidebarChildrenItem[];
}

const OffCampus = ({ items }: OffCampusProps) => {
  const dispatch = useAppDispatch();
  const { activeLocation } = useAppSelector((state) => state.locations);

  const itemWidth = useBreakpointValue({ base: 128, md: 145 }) || 145;
  const breakpoint = useBreakpointValue({ base: 'base', md: 'md' }) || 'md';
  const [sliderDisabled, setSliderDisabled] = useState(false);

  const itemsNumber = items.length;
  const headerMinWidth = itemsNumber * itemWidth;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    arrows: false,
    slidesToScroll: 1,
    draggable: !sliderDisabled,
    swipe: !sliderDisabled,
    touchMove: !sliderDisabled
  };

  const handleSelectLocation = (location: SidebarChildrenItem) => () => {
    dispatch(setActiveLocation(location));
    if (location.location.modal) {
      dispatch(openModalByType(location.location.modal.type));
    }
  };

  useEffect(() => {
    const calculateSliderDisabled = () => {
      const totalItemsWidth = itemsNumber * (itemWidth + 5);
      let availableWidth;
      if (typeof window !== 'undefined') {
        const windowWidth = window.innerWidth;
        if (breakpoint === 'md') {
          availableWidth = windowWidth - SIDEBAR_WIDTH - 20;
        } else {
          availableWidth = windowWidth - 20;
        }
        if (totalItemsWidth <= availableWidth) {
          setSliderDisabled(true);
        } else {
          setSliderDisabled(false);
        }
      }
    };
    calculateSliderDisabled();
    window.addEventListener('resize', calculateSliderDisabled);
    return () => window.removeEventListener('resize', calculateSliderDisabled);
  }, [itemsNumber, itemWidth, breakpoint]);

  return (
    <Box
      position={{ base: 'fixed', md: 'absolute' }}
      bottom='0'
      left='0'
      zIndex='10'
      w={{ base: '100vw', md: `calc(100vw - ${SIDEBAR_WIDTH}px)` }}
    >
      <Flex
        p='6px'
        bg='yellow.100'
        justifyContent='center'
        width={{
          base: `min(calc(${headerMinWidth}px - 3px), 100vw)`,
          md: `min(calc(${headerMinWidth}px - 5px), calc(100vw - ${SIDEBAR_WIDTH}px))`
        }}
      >
        <Text
          fontSize='12px'
          fontWeight='semibold'
          textTransform='uppercase'
          textAlign='center'
        >
          Off campus
        </Text>
      </Flex>
      <Box
        as={Slider}
        {...settings}
        sx={{
          '.slick-list': {
            overflow: 'visible',
            margin: { base: '0 -1.5px', md: '0 -2.5px' }
          }
        }}
      >
        {items.map((location) => {
          const isActiveItem = activeLocation?.id === location.id;
          return (
            <Box key={location.id} px={{ base: '1.5px', md: '2.5px' }}>
              <Stack
                w={{ base: '125px', md: '140px' }}
                h={{ base: '100px', md: '115px' }}
                alignItems='center'
                justifyContent='space-between'
                gap={0}
              >
                <Flex
                  position='relative'
                  height={{ base: '78px', md: '87px' }}
                  width='100%'
                  overflow='hidden'
                  alignItems='center'
                  justifyContent='center'
                  bg='gray.200'
                >
                  <Image
                    src={location.location.preview}
                    alt={location.label}
                    objectFit='contain'
                    objectPosition='top'
                  />
                  <IconButton
                    opacity={isActiveItem ? '0' : '1'}
                    onClick={handleSelectLocation(location)}
                    aria-label='open off campus location details'
                    size={{ base: 'md', md: 'lg' }}
                    variant='filled'
                    colorScheme='blue'
                    position='absolute'
                    top='0'
                    left='0'
                    color='white'
                    transition='opacity 0.1s'
                    icon={
                      <LiaPlusSolid
                        strokeWidth='1.4px'
                        style={{
                          transform: 'scale(1.3)'
                        }}
                      />
                    }
                  />
                </Flex>

                <Box
                  pt='9px'
                  pb='7px'
                  px='5px'
                  bg={isActiveItem ? 'primary.150' : 'black'}
                  transition='background-color 0.1s'
                  w='100%'
                  flex={1}
                >
                  <Text
                    fontSize='10px'
                    fontWeight='semibold'
                    textAlign='center'
                    noOfLines={1}
                    color='white'
                  >
                    {location.label}
                  </Text>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OffCampus;
