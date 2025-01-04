// ** Type Imports
import { PaletteMode } from '@mui/material'
import { Skin, ThemeColor } from '../types'

import {
  blue as primary,
  // green as secondary,
} from '@mui/material/colors';

const DefaultPalette = (mode: PaletteMode, skin: Skin, themeColor: ThemeColor) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '58, 53, 65'
  const darkColor = '231, 227, 252'

  const mainColor = mode === 'light' ? lightColor : darkColor
  const secondaryColor = mode === 'light' ? '0,0,0' : '255,255,255'

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#C6A7FE'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#161616'
    } else if (mode === 'light') {
      return '#F4F5FA'
    } else return '#28243D'
  }

  return {
    customColors: {
      // dark: darkColor,
      // main: mainColor,
      light: lightColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === 'light' ? '#F4F5FA' : '#28243D', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F0F2F8' : '#474360',
      darkBg: skin === 'bordered' ? '#312D4B' : '#28243D',
      lightBg: skin === 'bordered' ? whiteColor : '#F4F5FA',
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759',
      overlay: 'rgba(0,0,0, .1)',
      overlayHover: 'rgba(255,255,255, .03)'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: primary[400], //'#9E69FD',
      main: primary[600], //'#9155FD',
      dark: primary[800], //'#804BDF',
      contrastText: whiteColor
    },
    secondary: {
      light: `rgba(${secondaryColor}, 0.5)`,
      main: `rgba(${secondaryColor}, 0.6)`,
      dark: `rgba(${secondaryColor}, 0.7)`,
      contrastText: whiteColor
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: whiteColor
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: whiteColor
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${secondaryColor}, 0.6)`,
      disabled: `rgba(${secondaryColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#1F1F1F',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette
