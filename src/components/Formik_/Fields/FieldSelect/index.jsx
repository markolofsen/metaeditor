import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import MuiMenuItem from '@mui/material/MenuItem';

// libs
import { Select } from 'formik-mui';

// blocks
import Field from '../Field'


const RootDiv = styled.div(theme => ({
  '& .MuiFormControl-root': {
    display: 'flex',
  }
}))

const MenuItem = styled.custom(MuiMenuItem, theme => ({
  [theme.breakpoints.down('sm')]: {
    overflow: 'hidden',
  },
}))

function CustomField({ InputProps, ...props }) {


  const renderOption = (option) => {
    if (typeof props.renderOption === 'function') {
      return props.renderOption(option);
    }
    return option.label;
  }

  return (
    <RootDiv>
      <Field
        formHelperText={{ children: props.helperText }}
        name={props.name}
        label={props.label}
        required={props.required}
        component={(payload) => (
          <Select {...payload} value={payload?.field.value || ''} />
        )}
      // validate={(age) =>
      //   !age
      //     ? 'Please enter your age'
      //     : age < 21
      //     ? 'You must be 21 or older'
      //     : undefined
      // }
      >

        {props.options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {renderOption(option)}
          </MenuItem>
        ))}

      </Field>
    </RootDiv>
  )
}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  renderOption: PropTypes.func,
};

CustomField.defaultProps = {
  errors: undefined,
  options: [],
};


export default CustomField
