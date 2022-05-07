/* Usage

// material
import Button from '@mui/material/Button';

// components
import CustomDialog from 'components/Dialog/'

function demo() {
  const refDialog = React.useRef(null)

  return (
    <div>
      <CustomDialog
        ref={refDialog}
        title="Some title"
        subtitle="Some subtitle"
        defaultOpen={false}
        closeIcon
        showActions
      >
        <div>Dialog content</div>
      </CustomDialog>

      <Button onClick={() => refDialog.current.open()}>
        Open dialog
      </Button>

      <Button onClick={() => refDialog.current.close()}>
        Close dialog
      </Button>

    </div>
  )
}
*/

import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MiuDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';



const Dialog = styled.custom(MuiDialog, theme => ({

  [theme.breakpoints.up('md')]: {
    backdropFilter: "blur(5px)",
  },

  '& .MuiPaper-root': {
    // border: `solid 3px rgba(255,255,255, .3)`,
    // [theme.breakpoints.up('md')]: {
    // backgroundColor: 'rgba(0,0,0,.8)',
    // border: `solid 2px rgba(255,255,255, .15)`,
    // backdropFilter: "blur(5px)",
    // },
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(1),
  },
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2, 3),
  }
}))

const DialogTitle = styled.custom(MuiDialogTitle, theme => ({
  borderBottom: `solid 1px ${theme.palette.divider}`,
  '& > button': {
    position: 'absolute',
    right: theme.spacing(1.2),
    top: theme.spacing(1.2),
  }
}))

const DialogContent = styled.custom(MuiDialogContent, theme => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
}))

const DialogContentText = styled.custom(MiuDialogContentText, theme => ({
  paddingBottom: theme.spacing(3),
}))

const DialogActions = styled.custom(MuiDialogActions, theme => ({
  padding: theme.spacing(4),
  '&[data-variant="actions"]': {
    padding: theme.spacing(3, 4),
    borderTop: `solid 1px ${theme.palette.divider}`,
  },
}))


const BootstrapDialogTitle = (props) => {
  const { children, onClose, closeIcon, ...other } = props;

  if (!closeIcon) {
    return (
      <DialogTitle {...other}>
        {children}
      </DialogTitle>
    );
  }

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {closeIcon ? (
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon>close</Icon>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};


function CustomDialog({ buttonConfirm, disableEscape, defaultOpen, ...props }) {
  const [open, setOpen] = React.useState(defaultOpen);

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({

    open: () => {
      handleClickOpen()
    },
    close: () => {
      handleClose()
    },

  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose()
  };

  const onClosePermissions = (reason) => {
    if (disableEscape && ['escapeKeyDown', 'backdropClick'].includes(reason)) return;
    handleClose();
  }

  let variant
  if (props.closeIcon) variant = 'icon'
  if (props.showActions) variant = 'actions'

  return (
    <div>
      <Dialog
        open={open}
        onClose={(event, reason) => onClosePermissions(reason)}
        fullWidth
        maxWidth={props.maxWidth}>

        <BootstrapDialogTitle
          closeIcon={props.closeIcon && !disableEscape}
          onClose={handleClose}>
          {props.title}
        </BootstrapDialogTitle>

        <DialogContent>

          {props.subtitle ? (
            <DialogContentText>
              {props.subtitle}
            </DialogContentText>
          ) : ''}

          {props.children}
        </DialogContent>
        {props.showActions && (
          <DialogActions data-variant={variant}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              color={buttonConfirm.color}
              disabled={buttonConfirm.disabled}
              variant="contained"
              onClick={async () => {
                const res = await buttonConfirm.onClick()
                if (typeof res === 'boolean' && res === false) return;

                handleClose()
              }}>
              {buttonConfirm.label}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

CustomDialog.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  closeIcon: PropTypes.bool,
  showActions: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  disableEscape: PropTypes.bool,
  buttonConfirm: PropTypes.exact({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  maxWidth: PropTypes.string,
}

CustomDialog.defaultProps = {
  defaultOpen: false,
  showActions: true,
  closeIcon: true,
  onClose: () => { },
  disableEscape: false,
  buttonConfirm: {
    label: 'Confirm',
    onClick: () => { },
    color: 'primary',
    disabled: false,
  },
  maxWidth: 'sm',
}


export default React.forwardRef((props, ref) => (
  <CustomDialog {...props} innerRef={ref} />
))
