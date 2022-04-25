import * as React from 'react';

// context
import { usePlayer, useConnection } from '../../context/';

// hooks
import { useCountdown } from 'metalib/common/hooks/'

// material
import MuiLinearProgress from '@mui/material/LinearProgress';

// styles
import { styled } from 'metalib/styles/'


const LinearProgress = styled.custom(MuiLinearProgress, theme => ({
  height: 1,
}))


function PreloaderProgress() {
  const player = usePlayer()
  const connection = useConnection()

  const secondsToStart = connection.state.seconds_to_start

  const countdown = useCountdown()

  React.useEffect(() => {

    if (player.state.loaded) {
      countdown.stop()
    } else {
      countdown.start(secondsToStart)
    }

  }, [secondsToStart, player.state.loaded])

  if (player.state.loaded || (player.state.connected && player.state.loaded)) {
    return (<div />);
  }

  return (
    <LinearProgress
      variant="determinate"
      value={countdown.value}
      color="inherit" />
  )
}


export default PreloaderProgress
