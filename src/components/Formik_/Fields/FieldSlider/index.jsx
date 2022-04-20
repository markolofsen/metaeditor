import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled, alpha } from 'metalib/styles/'

// material
import MuiSlider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// blocks
import { Field } from 'formik';


const Slider = styled.custom(MuiSlider, theme => ({

  '& .MuiSlider-rail': {
    color: alpha(theme.palette.divider, .3),
  },
  '& .MuiSlider-thumb': {
    color: theme.palette.text.primary,
  },
  '& .MuiSlider-track': {
    color: theme.palette.text.primary,
  },
}))

function ComponentField(props) {

  // const onChange = (value) => {
  //   props.form.setFieldValue(props.field.name, value)
  // }

  return (
    <Box>
      <Typography gutterBottom variant="caption">
        {props.label}
      </Typography>
      <Slider
        size="small"
        valueLabelDisplay="auto"
      />
    </Box>
  )
}

function CustomField({ InputProps, ...props }) {

  return (
    <Field
      component={ComponentField}
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
  InputProps: PropTypes.shape({
    // fullWidth: PropTypes.bool,
  })
};

CustomField.defaultProps = {
  errors: undefined,
  InputProps: {},
};


export default CustomField
