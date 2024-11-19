import { extendTheme } from '@chakra-ui/react';

import components from './components';
import colors from './colors';
import fonts from './fonts';
import styles from './styles';
import textStyles from './textStyles';

const theme = extendTheme(
  {
    direction: null,
    borders: null,
    colors: null,
    radii: null,
    blur: null,
    shadows: null,
    space: null,
    fontSizes: null,
    letterSpacings: null,
    lineHeights: null
  },
  {
    components,
    fonts,
    styles,
    colors,
    textStyles,
    breakpoints: {
      base: '0em', // 0px
      sm: '30em', // ~480px
      md: '48em', // ~768px
      lg: '62em', // ~992px
      xl: '80em', // ~1280px
      '2xl': '90em', // ~1440px
      '3xl': '100em' // ~1600px
    }
  }
);

export default theme;
