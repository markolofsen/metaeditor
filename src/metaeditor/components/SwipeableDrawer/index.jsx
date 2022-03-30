/* Usage

// material
import Button from '@mui/material/Button';

// components
import SwipeableDrawer from 'components/SwipeableDrawer/'

function Demo() {
  const refSwipeableDrawer = React.useRef(null)

  return (
    <div>
      <Button onClick={() => SwipeableDrawer.current.open()}>
        Open drawer
      </Button>

      <SwipeableDrawer
        ref={refSwipeableDrawer}
        anchor="left"
        width={500}
        onClose={() => {}}
        >
        <div>Content</div>
      </SwipeableDrawer>
    </div>
  )
}
*/

import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useMedia } from '../../common/hooks/';

// styles
import { styled } from '../../common/styles/'

// material
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';


const SwipeableDrawer = styled.custom(MuiSwipeableDrawer, (theme) => ({
  zIndex: theme.zIndex.appBar + 101,
}))



function CustomDrawer(props) {
  const media = useMedia();
  const isMobile = media.down.sm

  const [open, setOpen] = React.useState(false);

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({

    open: () => {
      toggleDrawer(null, true)
    },
    close: () => {
      toggleDrawer(null, false)
    }

  }));

  const toggleDrawer = (event, open) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open)

    if (open === false && typeof props.onClose === 'function') {
      props.onClose()
    }
  };

  let width = props.width
  if (isMobile) {
    width = `calc(100vw - ${theme.spacing(9)})`
  }

  return (
    <div>
      <SwipeableDrawer
        anchor={props.anchor}
        open={open}
        onClose={(event) => toggleDrawer(event, false)}
        onOpen={(event) => toggleDrawer(event, true)}
      >
        <Box sx={{ p: 0 }} style={{ width }}>
          {props.children}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

CustomDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.string,
  width: PropTypes.number,
  onClose: PropTypes.func,
};

CustomDrawer.defaultProps = {
  anchor: 'right',
  width: 500,
};

export default React.forwardRef((props, ref) => (
  <CustomDrawer {...props} innerRef={ref} />
))
