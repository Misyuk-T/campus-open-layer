import { defineStyleConfig } from '@chakra-ui/react';

const Drawer = defineStyleConfig({
  sizes: {
    sm: {
      dialog: {
        maxWidth: '25%'
      }
    },
    md: {
      dialog: {
        maxWidth: '40%'
      }
    },
    lg: {
      dialog: {
        maxWidth: '50%'
      }
    },
    xl: {
      dialog: {
        maxWidth: '60%'
      }
    },
    xxl: {
      dialog: {
        maxWidth: '70%'
      }
    },
    full: {
      dialog: {
        maxWidth: '100%'
      }
    }
  }
});

export default Drawer;
