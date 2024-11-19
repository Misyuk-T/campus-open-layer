import { IoTriangleSharp } from 'react-icons/io5';

import { Box, Flex, useTheme } from '@chakra-ui/react';

interface CustomPlayButtonProps {
  size: 'lg' | 'sm';
}

const CustomPlayButton = ({ size }: CustomPlayButtonProps) => {
  const { colors } = useTheme();

  const isLarge = size === 'lg';
  const iconSize = isLarge ? { base: '44px' } : { base: '25px', md: '25px' };
  const boxSize = isLarge ? { base: '100px' } : { base: '45px', md: '60px' };
  const iconWeightSpace = isLarge ? '10px' : '5px';

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      width={boxSize}
      height={boxSize}
      borderRadius='50%'
      bg='white'
    >
      <Box
        as={IoTriangleSharp}
        width={iconSize}
        height={iconSize}
        style={{
          marginLeft: iconWeightSpace,
          transform: 'rotate(90deg)',
          color: colors.gray[200]
        }}
      />
    </Flex>
  );
};

export default CustomPlayButton;
