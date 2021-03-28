const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#ff00ff',
    grey: '#f7f7f7',
  },
  fonts: {
    heading: 'system-ui',
    body: 'system-ui',
  },

  sizes: {
    headerH: '64px',
    container: '840px',
    full: '100%',
  },

  zIndices: {
    header: '999',
  },

  styles: {
    root: {
      fontFamily: 'body',
    },
    header: {
      alignItems: 'center',
      backgroundColor: 'grey',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      height: 'headerH',
      width: 'full',
      mx: 'auto',
      px: [2, 4],
      zIndex: 'header',
      nav: {
        ul: {
          display: 'flex',
          mr: 2,
          p: 0,
          listStyle: 'none',
          li: {
            ml: 2,
          },
        },
      },
    },
    main: {
      mt: (theme) => theme.sizes.headerH,
    },
  },

  buttons: {
    default: {
      cursor: 'pointer',
    },
    primary: {
      variant: 'buttons.default',
      color: 'text',
      backgrournd: 'primary',
    },
  },

  layout: {
    container: {
      px: [2, 4],
    },
  },
}

export default theme
