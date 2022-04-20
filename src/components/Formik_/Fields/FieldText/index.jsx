import PropTypes from 'prop-types';

// material
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

// libs
import { TextField } from 'formik-mui';
import { isMobile } from 'react-device-detect';

// blocks
import Field from '../Field'
import SlugField from './SlugField'
import MoneyField from './MoneyField'
import { offset } from '@popperjs/core';




function CustomField({ InputProps, ...props }) {

  let extraProps = {
    disabled: props.disabled,
  }

  if (isMobile) {
    extraProps.autoFocus = false
  }

  if (props.type === 'textarea') {
    extraProps = {
      ...extraProps,
      multiline: true,
      minRows: props.minRows,
      maxRows: props.maxRows,
    }
  }

  if (props.type === 'password' || props.autoComplete === false) {
    extraProps = {
      ...extraProps,
      autoComplete: 'new-password',
    }
  }

  // Component type
  let FieldComponent = TextField
  if (props.type === 'slug') FieldComponent = SlugField
  else if (props.type === 'money') FieldComponent = MoneyField


  // Adornments
  if (InputProps?.startAdornment) {
    InputProps.startAdornment = (
      <InputAdornment position="start">{InputProps.startAdornment}</InputAdornment>
    )
  }

  if (InputProps?.endAdornment) {
    InputProps.endAdornment = (
      <InputAdornment position="end">{InputProps.endAdornment}</InputAdornment>
    )
  }

  if (props.loading) {
    InputProps.endAdornment = (
      <CircularProgress color="inherit" size={20} />
    )
    extraProps.disabled = true
  }

  // Errors
  const errorMessage = props.errors[props.name]

  return (
    <Field
      error={errorMessage ? true : false}
      component={FieldComponent}
      label={props.label}
      name={props.name}
      type={props.type}
      required={props.required}
      fullWidth={props.fullWidth}
      helperText={errorMessage || props.helperText}
      {...extraProps}
      InputProps={{
        placeholder: props.placeHolder,
        // autoComplete: 'new-password',
        ...InputProps,
      }}
    />
  )
}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'number', 'url', 'textarea', 'slug', 'money']).isRequired,
  required: PropTypes.bool,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  placeHolder: PropTypes.string,
  fullWidth: PropTypes.bool,
  autoComplete: PropTypes.bool,
  loading: PropTypes.bool,
  InputProps: PropTypes.shape({
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
  }),

  // textarea
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
};

CustomField.defaultProps = {
  type: 'text',
  errors: undefined,
  fullWidth: true,

  // text, password
  autoComplete: true,

  // textarea
  minRows: 2,
  maxRows: 10,
};


export default CustomField
