import PropTypes from 'prop-types';

// blocks
import Field from '../Field'
import Autocomplete from './Autocomplete'

function CustomField(props) {

  return (
    <Field
      {...props}
      component={(payload) => {

        // Get error message
        let helperText = props.helperText
        let error = false;
        const err = payload.form.errors[payload.field.name]
        if(err) { helperText = err[0]; error = true; }

        return (
          <Autocomplete {...payload} {...props}
            value={payload.field.value}
            error={error}
            helperText={helperText}
          />
        )
      }}
    />
  )
}



CustomField.propTypes = {
  // method: PropTypes.func.isRequired,
};

CustomField.defaultProps = {
};

export default CustomField
