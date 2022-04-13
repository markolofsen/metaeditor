import * as React from 'react';
import PropTypes from 'prop-types';

// material
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';


function CustomSwitcher({ label, value, onChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        value={value}
        onChange={(event, v) => onChange(v)}
        control={<Switch defaultChecked />}
        label={
          <Box component="div" fontSize={12}>
            {label}
          </Box>
        } />
    </FormGroup>
  )
}

CustomSwitcher.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CustomSwitcher