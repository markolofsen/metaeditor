// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Theme Config Imports
import themeConfig from '../themeConfig'

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 12,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          padding: `${theme.spacing(1.875, 3)}`,
        },
        contained: {
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1.875, 5.5)}`,
          '&.MuiButton-containedWarning': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[800]
          }
        },
        outlined: {
          padding: `${theme.spacing(1.625, 5.25)}`,
          borderColor: theme.palette.divider
        },
        outlinedSecondary: {
          borderColor: theme.palette.divider
        },
        sizeSmall: {
          padding: `${theme.spacing(1, 2.25)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(1, 3.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(0.75, 3.25)}`
          }
        },
        sizeLarge: {
          minHeight: 56,
          padding: `${theme.spacing(2.125, 5.5)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(2.125, 6.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(1.875, 6.25)}`
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained:not([disabled])': {
            color: theme.palette.text.secondary
          }
        }
      }
    }
  }
}

export default Button
