// https://www.npmjs.com/package/react-number-format


import React from "react";
import PropTypes from 'prop-types';

// material
import TextField from '@mui/material/TextField';

// libs
import NumberFormat from 'react-number-format';


function MoneyField(props) {

  return (
    <NumberFormat
      onValueChange={({ floatValue }) => {
        props.form.setFieldValue(props.field.name, floatValue)
      }}
      fullWidth={props.fullWidth}
      variant="outlined"
      helperText={props.helperText}
      error={props.isError}
      type="tel"
      InputProps={props.InputProps}
      isNumericString
      decimalSeparator="."
      allowedDecimalSeparators="."
      thousandSeparator={true}
      prefix={undefined}
      value={props.field.value}
      customInput={TextField} />
  );

}

MoneyField.propTypes = {
  // label: PropTypes.string.isRequired,
};

MoneyField.defaultProps = {
};

export default MoneyField;
