import { VideoGallery } from '@src/components';

import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';

interface ImageAndVideoProps {
  title: string;
  text: string;
  videos: { url: string; title?: string }[];
  img: { url: string; alt?: string };
  info: {
    img: { url: string; alt?: string };
    title: string;
    text: string;
  };
}

const ImageAndVideo = ({
  title,
  text,
  videos,
  info,
  img
}: ImageAndVideoProps) => {
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
          h='auto'
          maxHeight={{ base: '300px', sm: '350px', md: '400px', xl: 'none' }}
          width={{ base: '100%', xl: '45%' }}
        >
          <Image
            src={img.url}
            alt={img.alt}
            height={{ base: 'auto', xl: '100%' }}
            width='100%'
            objectFit='cover'
          />
        </Flex>
        <Box width={{ base: '100%', xl: '55%' }}>
          <VideoGallery
            videoUrls={videos}
            sliderOptions={{ slidesToShow: 2 }}
            activeSlideStyles={{ mb: '20px' }}
          />
        </Box>
      </Flex>

      <Flex
        color='white'
        flexWrap={{ base: 'wrap', '3xl': 'nowrap' }}
        gap='30px'
      >
        <Stack width={{ '3xl': '45%' }}>
          {title && (
            <Text textStyle='h5' as='h5' textTransform='uppercase'>
              {title}
            </Text>
          )}
          {text && (
            <Text textStyle='paragraphMedium' lineHeight='140%'>
              {text}
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
          height='100%'
        >
          <Image
            src={info.img.url}
            alt={info.img.alt}
            w={{ base: '40px', md: '45px', lg: '50px' }}
            h={{ base: '40px', md: '45px', lg: '50px' }}
          />
          <Stack gap='13px'>
            <Text textStyle='h3' as='h3'>
              {info.title}
            </Text>
            <Text
              fontSize={{ base: '14px', sm: '16px', md: '18px' }}
              fontWeight={500}
              lineHeight='140%'
            >
              {info.text}
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default ImageAndVideo;
