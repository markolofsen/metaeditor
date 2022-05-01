/* Usage
// components
import ImageZoom from 'components/ImageZoom/'

function demo() {
  const redImageZoom = React.useRef(null)

  return (
    <div>
      <ImageZoom ref={redImageZoom} />
      <button onClick={() => redImageZoom.current.open(item.src)}>
        Show
      </button>
    </div>
  )
}


*/

import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useHotkeys } from 'metalib/common/hooks/'

// material
import { styled } from 'metalib/styles'
import MuiBackdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// libs
// https://prc5.github.io/react-zoom-pan-pinch/?path=/story/docs-props--page
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Backdrop = styled.custom(MuiBackdrop, theme => ({
  color: '#fff',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.common.white,
  },
}))

const ToolbarList = styled.ul(theme => ({
  position: 'fixed',
  top: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.drawer + 100,
  pointerEvents: 'none',
  '& > li': {
    padding: theme.spacing(.8),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    border: `solid 1px ${theme.palette.divider}`,
    pointerEvents: 'all',
  },
}))

const ImageDiv = styled.div(theme => ({

  cursor: 'zoom-in',
  [theme.breakpoints.up('md')]: {
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[20],
  },
  // '& img': {
  //   // borderRadius: theme.shape.borderRadius,
  // }
}))


function ImageZoom(props) {
  const [src, setSrc] = React.useState(false)
  const open = src ? true : false

  useHotkeys('escape', (e, ke) => {
    if (!e.repeat) {
      setSrc(false)
      return;
    }
  }, [src])

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  React.useImperativeHandle(props.innerRef, () => ({

    open: (src) => {
      setSrc(c => {
        return c ? false : src;
      })
    }

  }));

  const handleClose = () => {
    setSrc(false)
  }

  const renderToolbar = ({ zoomIn, zoomOut, resetTransform }) => {
    const list = [
      ['remove', () => zoomOut()],
      ['add', () => zoomIn()],
      ['close', () => {
        resetTransform()
        handleClose()
      }],
    ].map(([icon, onClick]) => ({ icon, onClick }))

    const getButton = (item) => {
      return (
        <IconButton onClick={item.onClick} size="large">
          <Icon>{item.icon}</Icon>
        </IconButton>
      )
    }

    return (
      <ToolbarList>
        <li>
          {getButton(list[0])}
          {getButton(list[1])}
        </li>
        <li>
          {getButton(list[2])}
        </li>
      </ToolbarList>
    );
  }

  return (
    <Backdrop open={open} onClick={handleClose}>
      <ImageDiv onClick={event => {
        event.preventDefault()
        event.stopPropagation()
      }}>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          centerOnInit
          centerZoomedOut
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>

              {renderToolbar({ zoomIn, zoomOut, resetTransform })}

              <TransformComponent>
                <img src={src || ''} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </ImageDiv>

    </Backdrop>
  )
}

ImageZoom.propTypes = {
  // children: PropTypes.node.isRequired,
}

ImageZoom.defaultProps = {
}

export default React.forwardRef((props, ref) => (
  <ImageZoom {...props} innerRef={ref} />
))
