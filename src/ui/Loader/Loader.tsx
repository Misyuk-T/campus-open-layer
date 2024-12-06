import { BoxProps, Center, Spinner } from '@chakra-ui/react';

interface LoaderProps {
  fixed?: boolean;
  absolute?: boolean;
  containerProps?: BoxProps;
}

const Loader = ({ fixed, absolute, containerProps = {} }: LoaderProps) => {
  if (fixed) {
    return (
      <Center
        position='fixed'
        top={0}
        left={0}
        width='100vw'
        height='100vh'
        zIndex={1000}
        bg='rgba(255, 255, 255, 0.1)'
        backdropFilter='blur(2px)'
        {...containerProps}
      >
        <Spinner
          size='lg'
          thickness='4px'
          speed='0.65s'
          emptyColor='primary.100'
        />
      </Center>
    );
  }

  if (absolute) {
    return (
      <Center
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        zIndex={100}
        bg='rgba(255, 255, 255, 0.1)'
        backdropFilter='blur(2px)'
        {...containerProps}
      >
        <Spinner
          size='lg'
          thickness='4px'
          speed='0.65s'
          emptyColor='primary.100'
        />
      </Center>
    );
  }

  return (
    <Spinner size='lg' thickness='4px' speed='0.65s' emptyColor='primary.100' />
  );
};

export default Loader;
