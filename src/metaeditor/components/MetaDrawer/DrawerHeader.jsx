import * as React from 'react';

// material
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// styles
import { styled } from '../../common/styles/'


const DialogTitle = styled.custom(MuiDialogTitle, theme => ({
  borderBottom: `solid 1px ${theme.palette.divider}`,
  ...theme.typography.h5,
  '& > button': {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  }
}))


const DrawerHeader = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 3 }} {...other}>
      {children}
      <IconButton
        onClick={onClose}
        color="inherit"
      >
        <Icon fontSize="large">close</Icon>
      </IconButton>
    </DialogTitle>
  );
};

export default DrawerHeader