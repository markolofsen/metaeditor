import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

// libs
import { Select } from 'formik-mui';

// blocks
import Field from '../Field'



const RootDiv = styled.div(theme => ({
  '& .MuiFormControl-root': {
    display: 'flex',
  }
}))

function CustomField({ InputProps, ...props }) {


  const renderOption = (payload, obj, option) => {
    const { form, field } = payload

    if (typeof props.renderOption === 'function') {
      return (
        <MenuItem onClick={() => {
          form.setFieldValue(field.name, option.value)
        }} value={option.value}>
          {props.renderOption(option)}
        </MenuItem>
      );
    }
    return undefined;
  }


  const defaultFilterOptions = createFilterOptions({
    // matchFrom: 'start',
    // stringify: (option) => option.title,
  });

  const filterOptions = (options, state) => {
    if (props.limitOptions) {
      return defaultFilterOptions(options, state).slice(0, props.limitOptions);
    }
    return defaultFilterOptions(options, state)
  };


  return (
    <RootDiv>
      <Field
        formHelperText={{ children: props.helperText }}
        name={props.name}
        label={props.label}
        required={props.required}
        component={(payload) => (
          <Autocomplete
            {...payload}
            disabled={props.disabled}
            autoHighlight
            autoSelect
            blurOnSelect
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => option.label.search(value)}
            renderOption={(obj, option) => renderOption(payload, obj, option)}
            onChange={(event, option) => {
              const { form, field } = payload
              form.setFieldValue(field.name, option?.value || '')
            }}
            disablePortal
            options={props.options}
            value={payload?.field.value || ''}
            renderInput={(params) => {

              let adornments = { startAdornment: undefined, endAdornment: undefined }
              if (InputProps?.startAdornment) {
                adornments.startAdornment = (
                  <InputAdornment position="start">{InputProps.startAdornment}</InputAdornment>
                )
              }

              if (InputProps?.endAdornment) {
                adornments.endAdornment = (
                  <InputAdornment position="end">{InputProps.endAdornment}</InputAdornment>
                )
              }

              params.InputProps = {
                ...params.InputProps,
                ...adornments,
              }

              return (
                <TextField label={props.label} {...params} />
              )
            }}
          />
        )}
      // validate={(age) =>
      //   !age
      //     ? 'Please enter your age'
      //     : age < 21
      //     ? 'You must be 21 or older'
      //     : undefined
      // }
      />

    </RootDiv>
  )
}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.disabled,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  renderOption: PropTypes.func,
  InputProps: PropTypes.shape({
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
  }),
  limitOptions: PropTypes.number,
};

CustomField.defaultProps = {
  limitOptions: 0,
  errors: undefined,
  options: [],
};


export default CustomField
