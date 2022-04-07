import PropTypes from 'prop-types';

// blocks
import Field from '../Field'
import PhoneNumber from './PhoneNumber/'


function CustomField({InputProps, ...props}) {
  return (
    <Field
      component={PhoneNumber}
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
};


export default CustomField
