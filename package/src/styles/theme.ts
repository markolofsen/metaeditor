export const global: any = {
  '@global': {
    body: {
      overscrollBehavior: 'contain',
    },
    // rsuit
    '.rs-drawer-wrapper': {
      pointerEvents: 'none',
      '& *': {
        pointerEvents: 'all',
      },
    },
    '.rs-drawer': {
      backdropFilter: 'blur(5px)',
      borderLeft: 'solid 1px rgba(255, 255, 255, .2)',
    },
    '.rs-drawer-content': {
      backgroundColor: 'rgba(0, 0, 0, .8)',
    },
    '.rs-sidenav-default': {
      backgroundColor: 'transparent',
      '& .rs-dropdown-toggle, & .rs-sidenav-item': {
        backgroundColor: 'transparent',
      },
      [`& .rs-dropdown.rs-dropdown-open .rs-dropdown-toggle,
        & .rs-dropdown .rs-dropdown-toggle,
        & .rs-sidenav-item,
        & .rs-dropdown-toggle,
        & .rs-sidenav-item`]: {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, .3)',
        }
      }
    },

    '.rs-toast.rs-notification': {
      width: 320,
    },

    '.rs-notification': {
      width: '100%',
    }
  },
}