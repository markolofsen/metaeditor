import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import FormLabel from '@mui/material/FormLabel';
import MuiFormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import MuiFormHelperText from '@mui/material/FormHelperText';


const FormControl = styled.custom(MuiFormControl, theme => ({
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px transparent`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 4, 3),
  width: '100%',
  '& > legend': {
    ...theme.typography.button,
  }
}))


const FormControlClosed = styled.custom(MuiFormControl, theme => ({
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px transparent`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 4),
  width: '100%',
  cursor: 'pointer',
  '& > label': {
    cursor: 'pointer',
    ...theme.typography.button,
  }

}))


const FormHelperText = styled.custom(MuiFormHelperText, theme => ({
  margin: theme.spacing(3, 0, 0, 0),

}))


function FormGroupWrapper({ label, helperText, children, isClosed, ...props }) {

  const [open, setOpen] = React.useState(!isClosed)

  if (!open) {
    return (
      <FormControlClosed component="fieldset" variant="outlined" margin="normal" onClick={() => setOpen(true)}>
        <FormLabel component="label">
          {label}
        </FormLabel>
      </FormControlClosed>
    );
  }


  return (
    <FormControl component="fieldset" variant="outlined" margin="normal" {...props}>
      <FormLabel component="legend">
        {label}
      </FormLabel>

      <div>
        <FormGroup>
          {children}
        </FormGroup>

        {helperText || props.error ? (
          <FormHelperText>
            {props.error || helperText}
          </FormHelperText>
        ) : ''}
      </div>

    </FormControl>
  )
}


FormGroupWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isClosed: PropTypes.bool,
};

FormGroupWrapper.defaultProps = {
  isClosed: false,
};

export default FormGroupWrapper
