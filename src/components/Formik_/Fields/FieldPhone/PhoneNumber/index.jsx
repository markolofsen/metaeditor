import { forwardRef } from 'react'

// styles
import { styled } from 'metalib/styles/'

// material
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText';
import MuiFormControl from '@mui/material/FormControl';

// libs
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

// blocks
import SelectCountry from './SelectCountry'



const FormControl = styled.custom(MuiFormControl, theme => ({
  display: 'block',
}))


const CustomPhoneNumber = (props, ref) => {

  return (
    <TextField
      {...props}
      inputRef={ref}
      label={props.label}
      name={props.name}
    />
  )
}

const RefPhone = forwardRef(CustomPhoneNumber)


function PhoneField({ form, field, ...props }) {

  const error = form.errors[field.name]
  const errorText = error
  const isError = errorText ? true : false

  return (
    <FormControl error={isError}>
      <PhoneInput
        international
        error={isError}
        countryCallingCodeEditable
        defaultCountry="US"
        value={field.value}
        name={props.name}
        label={props.label}
        onChange={(value) => {
          form.setFieldValue(field.name, value)
        }}
        inputComponent={RefPhone}
        countrySelectComponent={SelectCountry}
      />
      {isError && (
        <FormHelperText>{errorText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default PhoneField
