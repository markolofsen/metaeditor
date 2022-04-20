import * as React from 'react';
import PropTypes from 'prop-types';

// material
import InputAdornment from '@mui/material/InputAdornment';

// blocks
import Field from '../Field'

// libs
import { TextField } from 'formik-mui';

// blocks
import ColorBox from './ColorBox'


function ComponentField({InputProps, ...props}) {
  const refBox = React.useRef(null)
  const [open, setOpen] = React.useState(false)

  const onChange = (value) => {
    props.form.setFieldValue(props.field.name, value)
  }


  InputProps.readOnly = true
  InputProps.startAdornment = (
    <InputAdornment position="start">
      <ColorBox onChange={onChange} onOpen={setOpen} ref={refBox} />
    </InputAdornment>
  )

  return (
    <TextField {...props} InputProps={InputProps} onClick={() => {
      if(!open) {
        refBox.current.open()
      }
    }} />
  )
}

function CustomField({InputProps, ...props}) {

  return (
    <Field
      component={ComponentField}
      name={props.name}
      type={props.type}
      label={props.label}
      fullWidth={props.fullWidth}
      required={props.required}
      InputProps={InputProps}
    />
  )
}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.any,
  fullWidth: PropTypes.bool,
  InputProps: PropTypes.shape({
    // fullWidth: PropTypes.bool,
  })
};

CustomField.defaultProps = {
  errors: undefined,
  fullWidth: true,
  InputProps: {},
};


export default CustomField
