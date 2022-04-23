import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { usePlayer, useConnection } from '../../context/';

// hooks
import { useCountdown } from 'metalib/common/hooks/'

// material
import MuiBox from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

// styles
import { styled } from 'metalib/styles/'

// blocks
import Progress from './Progress'
import { Typography } from '@mui/material';


const LogoDiv = styled.div(theme => ({
  paddingBottom: theme.spacing(4),
  '& > img': {
    maxWidth: 100,
  },
}))

const RootBox = styled.custom(MuiBox, theme => ({

  '@keyframes preloader-opacity': {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  },

  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  height: 'var(--window-height)',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  backgroundColor: 'rgba(0,0,0,1)',

  '&[data-loaded="true"]': {
    pointerEvents: 'none',
    animationName: 'preloader-opacity',
    animationDuration: '2.5s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  },

}))

const ProgressBox = styled.custom(MuiBox, theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',

  paddingBottom: '15vh',

  '& > [data-progress]': {
    width: '20vw',
  },
  '& > [data-helpertext]': {
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: theme.spacing(3),
    letterSpacing: '.3em',
  },

}))

const ButtonStopped = styled.custom(IconButton, theme => ({
  position: 'relative',
  '& > .material-icons': {
    fontSize: '5rem',
  },
}))

const VideoCover = styled.div(theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  backgroundColor: 'rgba(0,0,0, 1)',
  '& > video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: .4,

    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
  },

}))

function Preloader({ logoUrl, videoUrl }) {
  const player = usePlayer()
  const connection = useConnection()
  const countdown = useCountdown()

  const secondsToStart = connection.state.seconds_to_start

  React.useEffect(() => {

    if (player.state.loaded) {
      countdown.stop()
    } else {
      countdown.start(secondsToStart)
    }

  }, [secondsToStart, player.state.loaded])

  const renderInner = () => {

    if (player.state.connected && player.state.loaded) {
      return (<div />);
    }

    const renderPreloader = () => {

      const streamAccesible = player.connector.accessible
      const streamIsConnected = player.state.loaded && player.state.connected
      const streamIsConnecting = player.state.loaded && !player.state.connected
      const streamIsActive = streamAccesible && streamIsConnected && !player.state.stream_stopped
      // const connectOnStart = player.state.settings.connectOnStart && streamIsActive

      if (streamAccesible && !streamIsConnected) {
        return (
          <ButtonStopped
            disabled={streamIsConnecting}
            onClick={() => {
              player.connector.initConnection()
            }}>
            <Icon>play_arrow</Icon>
          </ButtonStopped>
        );
      }

      const getBar = () => {
        const getQue = () => {
          const que = connection.state.que
          if (typeof que === 'number' && que > 1) {
            return (
              <Typography variant="h6" sx={{ mt: 3 }}>
                You are number #{que} in line
              </Typography>
            )
          }
        }

        if (countdown.value === 0 || countdown.value >= 100) {
          return (
            <>
              <CircularProgress
                color="inherit"
                size={30} />
              {getQue()}
            </>
          );
        }

        const renderLabel = () => {
          const v = countdown.value
          let labelsList = [
            'Turning on the server',
            'Streaming server request',
            'Unreal Engine initialization',
            'Final preparations',
            'Connecting...',
          ]

          let index = 0

          if (v < 20) index = 0
          else if (v < 40) index = 1
          else if (v < 70) index = 2
          else if (v < 90) index = 3
          else index = 4

          const step = `(${index + 1}/${labelsList.length})`
          const label = labelsList[index]

          return (
            <div data-helpertext>
              {step} {label}
            </div>
          )
        }

        return (
          <>
            <div data-progress>
              <Progress />
            </div>

            {renderLabel()}
          </>
        )
      }

      return (
        <ProgressBox>

          {logoUrl ? (
            <LogoDiv>
              <img src={logoUrl} />
            </LogoDiv>
          ) : ''}

          {getBar()}

        </ProgressBox>
      );
    }

    return (
      <div>

        {videoUrl ? (
          <VideoCover>
            <video loop autoPlay muted>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </VideoCover>
        ) : ''}

        {renderPreloader()}
      </div>
    )
  }

  const playerLoaded = player.state.loaded
  return (
    <RootBox data-loaded={playerLoaded}>
      {renderInner()}
    </RootBox>
  )
}


Preloader.propTypes = {
  logoUrl: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default Preloader
