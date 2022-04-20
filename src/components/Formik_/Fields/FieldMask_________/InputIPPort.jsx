import React from "react";
import PropTypes from 'prop-types';

// material
import TextField from '@mui/material/TextField';

// libs
import InputMask from "react-input-mask";

function InputIPPort(props) {

  return (
    <InputMask
      readOnly={props.disabled}
      mask="99999"
      maskChar={null}
      alwaysShowMask={false}
      value={props.value}
      onChange={props.onChange}>
      {(inputProps) => (
        <TextField
          {...inputProps}
          size="small"
          fullWidth={props.fullWidth}
          type="tel"
          label={props.label}
          variant="outlined" />
      )}
    </InputMask>
  )
}

InputIPPort.propTypes = {
	label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

InputIPPort.defaultProps = {

};

export default InputIPPort;
