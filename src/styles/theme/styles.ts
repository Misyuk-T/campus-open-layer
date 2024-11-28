const styles = {
  global: {
    html: {
      overflowX: 'hidden'
    },
    body: {
      fontFamily: 'primary',
      lineHeight: 1.2,
      overflowX: 'hidden'
    },
    main: {
      flexGrow: 1
    },

    '.overflow-visible': {
      '.slick-slider': {
        height: '100%',
        width: '100%',

        '.slick-list': {
          height: '100% !important'
        },

        '.slick-track': {
          height: '100%',
          display: 'flex'
        },

        '.slick-slide': {
          height: 'auto',
          overflow: 'hidden'
        },

        '.slick-slide > div, .slick-slide > div > div, .slick-slide > div > div > img':
          {
            height: '100%'
          },

        '.slick-slide > div > img': {
          objectFit: 'cover'
        }
      }
    }
  }
};

export default styles;
