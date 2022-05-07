import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'

// material
import MuiButton from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';


const Button = styled.custom(MuiButton, theme => ({
  width: 48,
  height: 48,
  minWidth: 'auto',
  backgroundColor: theme.palette.background.paper,
}))


function PublicButton({ active, tooltip, ...props }) {
  return (
    <Tooltip title={tooltip}>
      <Button
        variant={active ? 'outlined' : 'contained'}
        {...props} />
    </Tooltip>
  )
}

export default PublicButton
