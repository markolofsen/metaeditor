import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);


  const [params, setParams] = React.useState({
    title: '...',
    severity: 'info', // 'error', 'warning', 'info', 'success',
  });


  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  React.useImperativeHandle(props.innerRef, () => ({

    error_code: (code) => {
      setParams({
        title: `Error: ${code}`,
        severity: 'error',
      })
      handleClick()
    },

    error: () => {
      setParams({
        title: 'Form filled with errors',
        severity: 'error',
      })
      handleClick()
    },

    success: () => {
      setParams({
        title: 'Form saved successfully!',
        severity: 'success',
      })
      handleClick()
    },

  }));


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={params.severity} sx={{ width: '100%' }}>
        {params.title}
      </Alert>
    </Snackbar>
  );
}

export default React.forwardRef((props, ref) => (
  <CustomizedSnackbars {...props} innerRef={ref} />
))
