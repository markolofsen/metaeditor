import * as React from 'react';

// import { makeStyles } from '@mui/styles';

// styles
import { makeStyles } from 'metalib/styles/'

// components
import { SnackbarProvider } from 'notistack';

// blocks
import SnackMessage from './SnackMessage'

// console.error('SnackMessage', SnackMessage)


const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
  },
  success: {
    // backgroundColor: theme.palette.success.main,
  },
  error: {
    // backgroundColor: theme.palette.error.main,
  },
  warning: {
    // backgroundColor: theme.palette.warning.main,
  },
  info: {
    // backgroundColor: theme.palette.info.main,
  },
}))



const Provider = ({ children }) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      style={{ pointerEvents: 'all' }}
      hideIconVariant={false}
      // disableWindowBlurListener={false}
      preventDuplicate
      maxSnack={5}
      dense
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      classes={{
        root: classes.root,
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
      content={(key, message) => {

        if (message?.title) {
          return (
            <SnackMessage id={key} message={message} title={message.title} />
          )
        }

        return undefined
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default Provider
