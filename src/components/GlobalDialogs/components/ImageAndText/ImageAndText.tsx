import { SimpleParagraph } from '@src/components/GlobalDialogs/components';
import { Popup2Data } from '@src/types/modals.ts';

import { Stack } from '@chakra-ui/react';

interface ImageAndTextProps {
  data: Popup2Data;
}

const ImageAndText = ({ data }: ImageAndTextProps) => {
  const { relationships } = data;
  const paragraphs = relationships.field_paragraph;

  return (
    <Stack
      w='100%'
      pb={{ base: '130px', md: '30px', lg: '60px' }}
      mt={{ base: '50px', md: '75px', lg: '80px' }}
    >
      <Stack gap={{ base: '30px', md: '40px', lg: '55px' }}>
        {paragraphs.map((paragraph, index) => (
          <SimpleParagraph key={index} data={paragraph} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ImageAndText;
