import * as React from 'react';
import PropTypes from 'prop-types';

// blocks
import { Field } from 'formik';

// libs
// import { Checkbox } from 'formik-mui';
import { CheckboxWithLabel } from 'formik-mui';


function CustomField(props) {

  return (
    <Field
      component={CheckboxWithLabel}
      name={props.name}
      type="checkbox"
      required={props.required}
      Label={{ label: props.label }}
    />
  )
}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.any,
};

CustomField.defaultProps = {
  errors: undefined,
};


export default CustomField
