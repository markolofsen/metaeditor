import { createTheme, responsiveFontSizes } from '@mui/material';
import { typography } from './typography';

// next
import { Roboto } from '@next/font/google';

// snippets
import { media } from './styles/'


/* Material-UI Theme Creator
https://bareynol.github.io/mui-theme-creator/
*/

import {
  blue as primary,
  green as secondary,
} from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const defaultColors = {
  default: '#212637',
  paper: '#1A1F2E',
  borderColor: 'rgba(255,255,255, .1)',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: defaultColors.default,
      paper: defaultColors.paper,
    },
    primary,
    secondary,

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },

  typography: {
    ...typography,
    fontFamily: roboto.style.fontFamily,
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: false,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {

        // /* ===== Scrollbar CSS ===== */
        // /* Firefox */
        // '*': {
        //   scrollbarWidth: 'auto',
        //   scrollbarColor: '#8f54a0 #ff0000',
        // },
        //
        // /* Chrome, Edge, and Safari */
        // '*::-webkit-scrollbar': {
        //   width: 16,
        // },
        //
        // '*::-webkit-scrollbar-track': {
        //   background: '#ff0000',
        // },
        //
        // '*::-webkit-scrollbar-thumb': {
        //   backgroundColor: '#8f54a0',
        //   borderRadius: 10,
        //   border: '3px solid #1f26ff',
        // },
        '& html, & body': {
          overscrollBehaviorY: 'contain',
        },
        html: {
          scrollBehavior: 'smooth',
          WebkitTextSizeAdjust: 'none',
          touchAction: 'manipulation',
        },
        body: {
          minHeight: '100vh',
          padding: 0,
          margin: 0,
          fontFamily: ['Roboto', 'Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'].join(', '),
          WebkitFontSmoothing: 'antialiased',
          lineHeight: 'unset',
        },
        '*': {
          boxSizing: 'border-box',
        },
        hr: {
          height: 1,
          border: 0,
        },
        // ul: {
        //   listStyle: 'none none',
        //   margin: 0,
        //   padding: 0,
        // },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: defaultColors.paper,
          backgroundImage: 'none',
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: defaultColors.paper,
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          [media.down.sm]: {
            height: 28,
          },
        },
        label: {
          [media.down.sm]: {
            padding: '3px 8px',
            fontSize: '0.9em',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: defaultColors.default,
          // backgroundImage: 'none',
          // backgroundImage: `linear-gradient(${darken(defaultColors.paper, .1)}, ${darken(defaultColors.default, .2)})`,
        }
      },
    },
    MuiModal: {
      styleOverrides: {
        // paper: {
        //   backgroundColor: defaultColors.default,
        // }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 10,
          cursor: 'pointer',
          minHeight: 42,
          '&[data-rounded]': {
            borderRadius: 100,
          },
        },
        sizeLarge: {
          minWidth: '0%',
          minHeight: 60,
        },
        sizeSmall: {
          minWidth: '0%',
          minHeight: 30,
        },
        outlinedInherit: {
          borderColor: defaultColors.borderColor,
        }
      },
    },
  },


});


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


if (typeof window !== 'undefined') {
  window.theme = theme
}


export default responsiveFontSizes(theme);
