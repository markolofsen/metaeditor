import { createTheme, responsiveFontSizes } from '@mui/material';

// ** Theme Override Imports
import { typography } from './typography';
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'
import overrides from './overrides'
import palette from './palette'

// config
import themeConfig from './themeConfig';


const { mode, skin, themeColor } = themeConfig

const theme = createTheme({
  palette: palette(mode, skin, themeColor),
  shadows: shadows(mode),
  ...spacing,
  breakpoints: breakpoints(),
  shape: {
    borderRadius: 12,
  },
  typography,
  mixins: {
    toolbar: {
      minHeight: 64
    }
  },

});

const themeOverrides = {
  ...theme,
  components: {
    ...overrides(theme, themeConfig),
  },
}

export default responsiveFontSizes(themeOverrides);
