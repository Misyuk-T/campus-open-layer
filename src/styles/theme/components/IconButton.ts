import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

type SchemeStyles = {
  [key: string]: { color: string; bg: string };
};

const SCHEME_STYLES: SchemeStyles = {
  black: {
    color: 'white',
    bg: 'black'
  },
  blue: {
    color: 'white',
    bg: 'blue.200'
  },
  white: {
    color: 'white',
    bg: 'white'
  }
};

const SCHEME_HOVER_STYLES: SchemeStyles = {
  black: {
    color: 'white',
    bg: 'blackAlpha.800'
  },
  blue: {
    color: 'white',
    bg: 'blue.100'
  },
  white: {
    color: 'white',
    bg: 'whiteOpacity.10'
  }
};

const filledStyle = defineStyle((props: StyleFunctionProps) => ({
  ...SCHEME_STYLES[props.colorScheme],
  _hover: SCHEME_HOVER_STYLES[props.colorScheme],
  _active: {
    opacity: 0.9
  }
}));

const outlinedStyle = defineStyle((props: StyleFunctionProps) => ({
  color: SCHEME_STYLES[props.colorScheme].color,
  bg: 'transparent',
  borderColor: SCHEME_STYLES[props.colorScheme].bg,
  _hover: SCHEME_HOVER_STYLES[props.colorScheme],
  _active: {
    opacity: 0.9
  }
}));

const buttonSizes = {
  xl: defineStyle({
    px: '10px',
    py: '10px',
    fontSize: '14px',
    h: '36px',
    minW: '36px',
    '& svg': {
      fill: 'currentColor',
      width: '18px',
      h: '18px'
    }
  }),
  lg: defineStyle({
    px: '10px',
    py: '10px',
    fontSize: '14px',
    h: '36px',
    minW: '36px',
    '& svg': {
      fill: 'currentColor',
      width: '14px',
      h: '14px'
    }
  }),
  md: defineStyle({
    px: '5px',
    py: '5px',
    fontSize: '10px',
    h: '22px',
    minW: '22px',
    '& svg': {
      width: '10px',
      h: '10px'
    }
  }),
  sm: defineStyle({
    px: '4px',
    py: '4px',
    fontSize: '8px',
    h: '18px',
    minW: '18px',
    '& svg': {
      width: '8px',
      h: '8px'
    }
  })
};

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    border: '1px solid white',
    width: 'auto',
    borderRadius: 0,
    _focus: {
      boxShadow: 'none'
    }
  },
  sizes: buttonSizes,
  variants: {
    filled: filledStyle,
    outlined: outlinedStyle
  },
  defaultProps: {
    size: 'md',
    variant: 'filled',
    colorScheme: 'black'
  }
});

export default Button;
