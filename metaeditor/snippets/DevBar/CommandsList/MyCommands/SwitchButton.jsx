import * as React from 'react';

// material
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function SwitchButton({ onChange, value, ...props }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch size="small" />}
        onChange={event => onChange(event.target.checked)}
        checked={value}
        {...props} />
    </FormGroup>
  );
}


export default SwitchButton