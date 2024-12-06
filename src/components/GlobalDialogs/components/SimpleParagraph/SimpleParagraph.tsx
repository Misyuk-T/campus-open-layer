import { ParagraphData } from '@src/types/modals.ts';
import { HtmlContent } from '@src/ui';

import { Box, Image, Stack, Text } from '@chakra-ui/react';

interface SimpleParagraphProps {
  data: ParagraphData;
}

const SimpleParagraph = ({ data }: SimpleParagraphProps) => {
  const {
    field_location_image,
    field_title,
    field_location_description,
    anchor_parameters
  } = data;

  const anchorClass = anchor_parameters ? anchor_parameters.anchor_id : '';

  return (
    <Stack
      className={`scroll-item-${anchorClass}`}
      justifyContent='center'
      alignItems='center'
      w='100%'
      gap={{ base: '20px', md: '25px', lg: '30px' }}
    >
      {(field_title || field_location_description) && (
        <Stack
          gap={{ base: '5px', md: '12px' }}
          w='100%'
          color='white'
          textAlign='left'
        >
          {field_title && (
            <Text textStyle='h5' as='h5' textTransform='uppercase'>
              {field_title}
            </Text>
          )}

          {field_location_description && (
            <Text textStyle='paragraphMedium' lineHeight='140%' as='div'>
              <HtmlContent content={field_location_description} />
            </Text>
          )}
        </Stack>
      )}

      {field_location_image && (
        <Box width='100%' overflow='hidden'>
          <Image
            src={field_location_image.url}
            mx='auto'
            w='100%'
            alt={field_title || 'Paragraph Image'}
            objectFit='cover'
          />
        </Box>
      )}
    </Stack>
  );
};

export default SimpleParagraph;
