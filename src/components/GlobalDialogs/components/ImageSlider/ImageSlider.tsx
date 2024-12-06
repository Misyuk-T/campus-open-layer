import Slider from 'react-slick';
import PeopleIcon from '@src/assets/icons/Icon material-people.svg';
import { Popup4Data } from '@src/types/modals.ts';
import { HtmlContent } from '@src/ui';

import { Box, Flex, Image, Stack, Text, VStack } from '@chakra-ui/react';

import { IconItemComponent } from './components';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.3,
  slidesToScroll: 1,
  arrows: false
};

interface ImageSliderProps {
  data: Popup4Data;
}

const ImageSlider = ({ data }: ImageSliderProps) => {
  const {
    field_title: title,
    field_location_description: description,
    field_image_carousel,
    field_capacity
  } = data.attributes;
  const iconItems = data.relationships?.field_location_links?.map((link) => ({
    icon: link?.field_link_icon?.url || '',
    text: link?.field_location_link?.title || '',
    link: link?.field_location_link?.uri || ''
  }));
  const isIconItemsExist = iconItems?.length > 0;

  return (
    <Stack
      w='100%'
      pb={{ base: '130px', md: '30px', lg: '60px' }}
      mt='10px'
      gap={{ base: '20px', md: '30px', lg: '45px' }}
    >
      <Box
        className='overflow-visible'
        sx={{
          '.slick-list': {
            overflow: 'visible',
            margin: '0 -10px'
          }
        }}
      >
        <Slider {...sliderSettings}>
          {field_image_carousel.map((image, index) => (
            <Box key={index} h='auto' w='100%' px='10px'>
              <Image
                src={image.url}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Flex
        color='white'
        w='100%'
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '40px', xl: '50px' }}
      >
        <Stack gap='12px' width={{ base: '100%', lg: '70%' }}>
          {title && (
            <Text textStyle='h5' as='h5' textTransform='uppercase'>
              {title}
            </Text>
          )}
          {description && (
            <Text textStyle='paragraphMedium' lineHeight='140%' as='div'>
              <HtmlContent content={description} />
            </Text>
          )}

          {field_capacity && (
            <VStack align='flex-start' mt='10px'>
              <IconItemComponent
                icon={PeopleIcon}
                text={`Capacity: ${field_capacity}`}
              />
            </VStack>
          )}
        </Stack>

        {isIconItemsExist && (
          <Flex
            align='flex-start'
            justifyContent='flex-start'
            gap={{ base: '30px', md: '18px' }}
            width={{ base: '100%', lg: '30%' }}
            minWidth={{ lg: '220px' }}
            direction={{ base: 'row', lg: 'column' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
          >
            {iconItems.map((item, index) => (
              <IconItemComponent
                key={index}
                icon={item.icon}
                text='item.text'
                link={item.link}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Stack>
  );
};

export default ImageSlider;
