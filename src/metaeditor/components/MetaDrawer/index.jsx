import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useMedia } from 'metalib/common/hooks/';

// material
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// styles
import { styled } from 'metalib/styles/'

// blocks
import DrawerHeader from './DrawerHeader'

const Drawer = styled.withStyles(MuiDrawer, theme => ({

  paper: {
    pointerEvents: 'all',


    [theme.breakpoints.down('sm')]: {
      background: 'rgba(0,0,0,.9)',
      boxShadow: 'none',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
      background: 'rgba(0,0,0,.6)',
      backdropFilter: 'blur(5px)',
    },
  },
  root: {
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    '& .MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
  },
  modal: {
    // backgroundColor: 'yellow',
  },
}))

function MetaDrawer(props) {

  const media = useMedia()
  const [open, setOpen] = React.useState(false)

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  React.useEffect(() => {
    if (!open) {
      props.onClose()
    }
  }, [open])

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(isOpen)
  };

  const handleClose = () => {
    setOpen(false)
  }

  let anchor = props.anchor
  let extraStyles = {
    width: anchor === 'top' || anchor === 'bottom' ? 'auto' : props.width,
  }

  if (media.down.sm) {
    anchor = 'top'
    extraStyles.width = '100%'
  } else {
    if (anchor === 'left') {
      extraStyles.borderRightWidth = 1
    } else {
      extraStyles.borderLeftWidth = 1
    }
  }

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          border: 'solid 0px rgba(255,255,255, .1)',
          ...extraStyles,
        }}>
          <DrawerHeader onClose={handleClose}>
            {props.title}
          </DrawerHeader>
          <Box sx={{ flex: 1, p: 3 }}>
            {props.children}
          </Box>
        </Box>
      </Drawer>
    </div >
  );
}


MetaDrawer.propTypes = {
  title: PropTypes.any,
  children: PropTypes.node,
  anchor: PropTypes.string,
  width: PropTypes.any,
  onClose: PropTypes.func,
};

MetaDrawer.defaultProps = {
  anchor: 'left',
  width: 500,
  onClose: () => { },
};

export default React.forwardRef((props, ref) => (
  <MetaDrawer {...props} innerRef={ref} />
))
