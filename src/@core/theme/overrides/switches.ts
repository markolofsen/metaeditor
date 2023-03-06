// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Switch = (theme: Theme) => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            backgroundColor: `rgb(${theme.palette.primary.main})`
          }
        }
      }
    }
  }
}

export default Switch
