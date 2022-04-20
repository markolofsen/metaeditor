import PropTypes from 'prop-types';

// material
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

// libs
import { DatePicker, DateTimePicker, TimePicker } from 'formik-mui-lab';

// blocks
import Field from '../Field'



function CustomField(props) {

  const componentsList = {
    date: DatePicker,
    time: TimePicker,
    datetime: DateTimePicker,
  }

  return (
    <Field
      component={componentsList[props.type]}
      name={props.name}
      label={props.label}

      textField={{
        fullWidth: props.fullWidth,
        helperText: props.helperText,
        variant: 'outlined',
      }}
    />
  );

}
CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['date', 'time', 'datetime']).isRequired,
  required: PropTypes.bool,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  placeHolder: PropTypes.string,
  fullWidth: PropTypes.bool,
  InputProps: PropTypes.shape({
    // fullWidth: PropTypes.bool,
  }),

};

CustomField.defaultProps = {
  type: 'date',
  errors: undefined,
  fullWidth: true,
};


export default CustomField
