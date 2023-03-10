import * as React from 'react'

// configs
import project from 'src/configs/project';

// mui
import { styled } from '@mui/system';
import { Typography, Button, IconButton, Portal } from '@mui/material';

// icons
import CircularProgress from '@mui/material/CircularProgress';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

// hooks
import { Hooks } from 'pixel-streaming'


const RootDiv = styled('div')(({ theme }: any) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  padding: '3rem',

  '& > *': {
    pointerEvents: 'all',
    zIndex: 1,
  }
}))

const Background = styled('div')(({ theme }: any) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,

  opacity: .4,
  pointerEvents: 'none',

  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',

}))

const ErrorDiv = styled('div')(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const LoaderDiv = styled('div')(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > small': {
    textAlign: 'center',
    margin: '1rem 0 .5rem',
    cursor: 'default',
    opacity: .5,
  }
}))

const Preloader = () => {

  // hooks
  const preloader = Hooks.preloader()

  if (preloader.isWebrtcConnected) {
    return (
      <IconButton sx={{
        pointerEvents: 'none',
      }}>
        <PlayCircleIcon
          sx={{
            color: '#fff',
            fontSize: '6rem',
          }} />
      </IconButton>
    )
  }

  return (
    <LoaderDiv>
      <CircularProgress color='inherit' size={40} />

      <Typography variant="subtitle2" align="center" sx={{ mt: 5 }}>
        {preloader.connectionHeader}
      </Typography>
    </LoaderDiv>
  )
}

const WebrtcError = () => {

  // hooks
  const preloader = Hooks.preloader()

  return (
    <ErrorDiv>
      <Typography variant="h5" align="center" sx={{ mb: 5 }}>
        {preloader.webrtcErrorHeader}
      </Typography>
      <Button
        onClick={preloader.connect}
        size="large"
        color="primary"
        variant="contained">
        Restart
      </Button>
    </ErrorDiv>
  )
}

export default function PreloaderDialog() {

  // hooks
  const preloader = Hooks.preloader()

  React.useEffect(() => {

    preloader.hide()

  }, [])

  // render
  if (preloader.isWebrtcConnected) return null

  return (
    <Portal container={window.player?.rootElement}>
      <RootDiv>
        <Background sx={{
          backgroundImage: `url(${project.images.background})`
        }} />
        {preloader.webrtcErrorHeader ? (
          <WebrtcError />
        ) : (
          <Preloader />
        )}
      </RootDiv>
    </Portal>
  )
}