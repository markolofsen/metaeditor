import * as React from 'react';

// styles
import { styled } from 'metaeditor/common/styles/'

// material
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Portal from '@mui/material/Portal';

const BoxDiv = styled.div(theme => ({
  width: 30,
  height: 30,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: theme.transitions.create(['opacity']),
  '&:hover': {
    opacity: .7,
  }
}))


// libs
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";


function ColorLayer(props) {
  const [color, setColor] = useColor("hex", props.value);

  return (
    <ColorPicker
      width={300} height={200}
      color={color}
      onChange={(payload) => {
        props.onChange(payload)
        setColor(payload)
      }}
      hideHSV hideRGB dark />
  )
}

function ColorBox(props) {
  const refBox = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const [color, setColor] = React.useState('#000000')

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  React.useImperativeHandle(props.innerRef, () => ({

    open: () => {
      setAnchorEl(refBox.current)
    }

  }));

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChange = ({ hex }) => {
    setColor(hex)
    props.onChange(hex)
  }

  React.useEffect(() => {
    props.onOpen(open ? true : false)
  }, [open])

  return (
    <div>

      <BoxDiv
        ref={refBox}
        onClick={handleClick}
        style={{
          backgroundColor: color,
        }} />

      <Portal>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <ColorLayer onChange={onChange} value={color} />

        </Popover>
      </Portal>
    </div>

  )
}

export default React.forwardRef((props, ref) => (
  <ColorBox {...props} innerRef={ref} />
))
