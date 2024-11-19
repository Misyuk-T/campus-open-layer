import { IconItem } from '@src/types/global.ts';

import { Flex, Image, Link, Text } from '@chakra-ui/react';

interface IconItemComponentProps extends IconItem {}

const IconItemComponent = ({ icon, text, link }: IconItemComponentProps) => {
  return (
    <Flex alignItems='center' gap='16px' textAlign='center'>
      <Image width='36px' maxHeight='36px' src={icon} />
      {link ? (
        <Link
          href={link}
          fontSize={{ base: '14px', md: '16px' }}
          fontWeight='bold'
          textDecoration='underline'
        >
          {text}
        </Link>
      ) : (
        <Text fontSize={{ base: '14px', md: '16px' }} fontWeight='bold'>
          {text}
        </Text>
      )}
    </Flex>
  );
};

export default IconItemComponent;
