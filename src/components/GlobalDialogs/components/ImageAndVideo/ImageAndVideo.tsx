import { VideoGallery } from '@src/components';
import { Popup1Data } from '@src/types/modals.ts';
import { HtmlContent } from '@src/ui';

import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';

interface ImageAndVideoProps {
  data: Popup1Data;
}

const ImageAndVideo = ({ data }: ImageAndVideoProps) => {
  const { attributes } = data;
  const title = attributes.field_title || '';
  const text = attributes.field_location_description || '';

  return (
    <Stack
      w='100%'
      pb={{ base: '130px', md: '30px', lg: '60px' }}
      mt={{ base: '20px', md: '30px', lg: '40px' }}
      gap={{ base: '25px', md: '30px', lg: '40px' }}
    >
      <Flex
        gap='30px'
        flexWrap={{ base: 'wrap', xl: 'nowrap' }}
        justifyContent='center'
      >
        <Flex
          h='fit-content'
          maxHeight={{ base: 'none', xl: '469px' }}
          width={{ base: '100%', xl: '45%' }}
          overflow='hidden'
          alignItems='center'
        >
          {attributes.field_location_image && (
            <Image
              src={attributes.field_location_image.url}
              alt={attributes.field_location_image.alt}
              height={{ base: 'auto', xl: '100%' }}
              width='100%'
              objectFit='cover'
            />
          )}
        </Flex>
        <Box width={{ base: '100%', xl: '55%' }}>
          <VideoGallery
            videoUrls={attributes.field_campus_video || []}
            sliderOptions={{ slidesToShow: 2 }}
            activeSlideStyles={{ mb: '20px' }}
          />
        </Box>
      </Flex>

      <Flex
        color='white'
        flexWrap={{ base: 'wrap', '3xl': 'nowrap' }}
        alignItems='flex-start'
        gap='30px'
      >
        <Stack width={{ '3xl': '45%' }}>
          {title && (
            <Text textStyle='h5' as='h5' textTransform='uppercase'>
              {title}
            </Text>
          )}
          {text && (
            <Text textStyle='paragraphMedium' lineHeight='140%' as='div'>
              <HtmlContent content={text} />
            </Text>
          )}
        </Stack>
        <Flex
          alignItems='flex-start'
          gap='30px'
          p='25px 20px 30px 25px'
          color='white'
          bg='gray.750'
          width={{ base: '100%', '3xl': '55%' }}
        >
          {attributes.field_headline_icon && (
            <Image
              src={attributes.field_headline_icon.url}
              alt={attributes.field_headline_icon.alt}
              w={{ base: '40px', md: '45px', lg: '50px' }}
              h={{ base: '40px', md: '45px', lg: '50px' }}
            />
          )}
          <Stack gap='13px'>
            <Text textStyle='h3' as='h3'>
              {attributes.field_headline_title}
            </Text>
            <Text
              fontSize={{ base: '14px', sm: '16px', md: '18px' }}
              fontWeight={500}
              lineHeight='140%'
            >
              {attributes.field_headline_summary}
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ImageAndVideo;
