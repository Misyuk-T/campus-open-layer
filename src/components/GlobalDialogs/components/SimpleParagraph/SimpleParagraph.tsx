import { Element } from 'react-scroll';
import { ParagraphData } from '@src/types/global.ts';

import { Box, Image, Stack, Text } from '@chakra-ui/react';

interface SimpleParagraphProps {
  data: ParagraphData;
}

const SimpleParagraph = ({ data }: SimpleParagraphProps) => {
  const { image, title, text, anchorClass } = data;

  return (
    <Element name={anchorClass || ''}>
      <Stack
        className={anchorClass}
        justifyContent='center'
        alignItems='center'
        w='100%'
        gap={{ base: '20px', md: '25px', lg: '30px' }}
      >
        {(title || text) && (
          <Stack
            gap={{ base: '5px', md: '12px' }}
            w='100%'
            color='white'
            textAlign='left'
          >
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
        )}

        {image && (
          <Box width='100%' overflow='hidden'>
            <Image
              src={image}
              mx='auto'
              w='100%'
              alt={title || 'Paragraph Image'}
              objectFit='cover'
            />
          </Box>
        )}
      </Stack>
    </Element>
  );
};

export default SimpleParagraph;
