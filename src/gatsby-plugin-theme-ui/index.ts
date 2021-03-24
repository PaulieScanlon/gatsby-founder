const theme = {
  colors: {
    text: '#000',
    background: '#fff',
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

  styles: {
    header: {
      alignItems: 'center',
      display: 'flex',
      position: 'fixed',
      top: 0,
      left: 0,
      height: 'headerH',
      width: 'full',
      mx: 'auto',
      px: [2, 4],
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
}

export default theme
