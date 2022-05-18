
import * as React from 'react'

// context
import { usePlayer } from '../context';

// hooks
import { useCountdown } from '../hooks/useCountdown';

// ui
import { jss } from '../assets/styled';
import Progress from 'rsuite/Progress';
import Animation from 'rsuite/Animation';


const useStyles = jss({
  progressRoot: {
    position: 'absolute',
    zIndex: 1050 - 10,
    top: 27,
    left: 'calc((100vw - 200px) / 2)',
    right: 0,
    width: 200,
    pointerEvents: 'none',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    textShadow: '1px 1px rgba(0,0,0, .2)',

    '& .rs-progress-line-outer': {
      border: 'solid 1px rgba(0,0,0, .1)',
      '& .rs-progress-line-inner': {
        backgroundColor: 'rgba(255,255,255, .3)',
      }
    }

  },
})


export const ProgressKiller: React.FC<any> = () => {
  const classes = useStyles()
  const player = usePlayer()
  const contdown = useCountdown()

  const [mounted, setMounted] = React.useState(false)

  const secondsToKill = player.state.config.secondsToKill || 0
  const secondsToKillLeft = player.state.config.secondsToKillLeft || 0

  const { active } = player.computed.streaming

  React.useEffect(() => {
    if (active) {
      if (!mounted && secondsToKill > 0) {
        setMounted(true)
      }

      if (mounted && secondsToKillLeft > 0) {
        contdown.start(secondsToKillLeft)
      }

    } else {
      contdown.stop()
    }
  }, [active, secondsToKillLeft])

  const show = contdown.active && active

  if (!mounted) {
    return (<div />)
  }

  return (
    <Animation.Slide in={show} placement='top'>
      {(props, ref) => (
        <div className={classes.progressRoot}>
          <div {...props} ref={ref}>
            <div className={classes.progress}>
              <Progress.Line
                showInfo={false}
                strokeColor='#fff'
                percent={contdown.percent}
                status={'active'} />
              <div style={{ width: 60 }}>
                {contdown.time}
              </div>
            </div>
          </div>
        </div>
      )}
    </Animation.Slide>
  )
}