import * as React from 'react';

// hooks
import { useMedia } from '../common/hooks/';
import { getDevice } from '../common/funcs/';

// context
import { usePlayer } from '../context/';

// styles
import { styled } from '../common/styles/'

// material
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// components
import { QrCode } from '../components/'


const RootDiv = styled.div(theme => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  pointerEvents: 'all',
  lineHeight: 0,
  boxShadow: theme.shadows[5],
  color: theme.palette.background.default, //theme.palette.primary.main,
  opacity: .5,
  cursor: 'pointer',
  '&:hover': {
    opacity: 1,
  }
}))

const CloseButton = styled.custom(IconButton, theme => ({
  backgroundColor: '#fff',
  border: `solid 2px #000`,
  position: 'absolute',
  top: theme.spacing(-1),
  right: theme.spacing(-1),
  boxShadow: theme.shadows[5],
  '&:hover': {
    backgroundColor: '#fff',
  }
}))

function QrCodeTransition() {
  const media = useMedia()
  const player = usePlayer()

  const [overlay, setOverlay] = React.useState(true)
  const [hover, setHover] = React.useState(false)
  const [show, setShow] = React.useState(true)
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    // if (!player.state.loaded) return

    setValue(document.location.href)
  }, [player.state.loaded])

  const renderBackdrop = () => {
    return (
      <Backdrop
        sx={{ pointerEvents: 'all', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={() => setOverlay(false)}
      >

        <Box sx={{
          bgcolor: '#fff',
          p: 5,
          borderRadius: theme => theme.shape.borderRadius + 'px',
        }}>
          <Typography variant="h6" align="center" sx={{ mb: 4, maxWidth: 350, color: '#000' }}>
            Scan this QR code with your phone to continue browsing on your phone.
          </Typography>

          <QrCode
            bgColor="#ffffff"
            fgColor="#000000"
            size={350}
            value={value}
          />
        </Box>

      </Backdrop>
    )
  }

  const renderSmall = () => {
    return (
      <RootDiv onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && (
          <CloseButton size="small" color="inherit" onClick={() => setShow(false)}>
            <Icon>close</Icon>
          </CloseButton>
        )}
        <div onClick={() => setOverlay(true)}>
          <QrCode
            bgColor="#ffffff"
            fgColor="#000000"
            size={60}
            value={value}
          />
        </div>
      </RootDiv>
    )
  }

  if (!show || !value || getDevice.isMobile || media.down.sm) {
    return <></>
  }

  return (
    <>
      {overlay ? renderBackdrop() : renderSmall()}
    </>
  )
}

export default QrCodeTransition