import React from 'react';
import PropTypes from 'prop-types';

// material
import {
  makeStyles,
} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// blocks
import OrderForm from './DrawerContent/OrderForm'



const useStyles = makeStyles((theme) => ({

  root: {
    padding: theme.spacing(5),
  }

}))

function DialogForm(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      {props.children(handleClickOpen)}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <div className={classes.root}>
          <OrderForm unit_key={props.unit_key} />
        </div>
      </Dialog>

    </div>
  );
}

DialogForm.propTypes = {
  children: PropTypes.func.isRequired,
  unit_key: PropTypes.string.isRequired,
};

export default DialogForm
