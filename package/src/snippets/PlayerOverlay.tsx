import * as React from 'react'

// context
import { usePlayer, useSystem } from '../context/';

// ui
import { jss } from '../assets/styled';
import Progress from 'rsuite/Progress';
import IconButton from 'rsuite/IconButton';
import PlayOutlineIcon from '@rsuite/icons/PlayOutline';
import GearIcon from '@rsuite/icons/Gear';


const useStyles = jss({
  root: {
    transition: 'opacity 700ms linear',
    backgroundColor: '#000',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1050 - 100, //modal
    '& > video': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: .4,
      position: 'absolute',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: -1,
    }
  },
  box: {
    fontSize: 12,
    opacity: .7,
    display: 'inline-block',
    cursor: 'default'
  },
  reportLink: {
    display: 'inline-block',
    marginTop: 10,
    borderBottom: `solid 1px rgba(255,255,255,.3)`,
    cursor: 'pointer'
  }
})


interface Props {
  // children: any
}

export const PlayerOverlay: React.FC<Props> = () => {
  const classes = useStyles()
  const player = usePlayer()
  const system = useSystem()
  const refRoot = React.useRef<any>(null)

  const { percent, time } = player.cls.info.loading

  const videoUrl = system.config.videoUrl
  const { status, _isPending, _inProgress, _allowPlay, _allowOverlay, _playError } = player.computed.streaming

  React.useEffect(() => {
    refRoot.current.style.opacity = _allowOverlay ? 1 : 0;
    refRoot.current.style.pointerEvents = _allowOverlay ? 'all' : 'none'
  }, [_allowOverlay])

  const renderButton = (onClick: Function, Icon: Function, spin: boolean) => {
    return (
      <IconButton
        onClick={(event: any) => {
          event.preventDefault()
          event.stopPropagation()
          onClick()
        }}
        circle
        icon={(
          <Icon
            spin={spin}
            style={{ fontSize: '5em' }} />
        )} />
    )
  }

  const renderContent = () => {

    // const { active, empty, activation, initialized, initializing } = player.computed.streaming

    const eProps = {
      style: { width: 120, cursor: 'default' },
      percent,
      showInfo: true,
    }


    if (_playError) {
      return (<Progress.Circle {...eProps} status='fail' />)

    } else if (_inProgress && percent > 0) {

      //  else if (_allowPlay || initialized || active || percent >= 100) {
      //   return (<Progress.Circle {...eProps} status='success' />)
      // }

      return (<Progress.Circle {...eProps} status='active' />)

    } else if (_allowPlay) {
      return renderButton(() => player.cls.streamingConnect(), PlayOutlineIcon, false)
    }

    return renderButton(() => { }, GearIcon, true)
  }

  const renderStatus = () => {


    return (
      <div style={{
        textAlign: 'center'
      }}>

        <div style={{
          margin: 20
        }}>
          {renderContent()}
        </div>

        <div className={classes.box}>
          <div style={{
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}>
            {status} {_isPending && percent > 0 ? time : ''}
          </div>

          {system.config.issuesUrl ? (
            <div
              onClick={() => window.open(system.config.issuesUrl)}
              className={classes.reportLink}>
              Report a problem
            </div>
          ) : ''}


        </div>
      </div>
    )
  }

  return (
    <div
      ref={refRoot}
      className={classes.root}>

      {videoUrl ? (
        <video loop autoPlay muted>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : ''}

      {renderStatus()}

    </div>
  )
}