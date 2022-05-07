import * as React from 'react';

// context
import { usePlayer } from '../../../context/';

// material
import Icon from '@mui/material/Icon';
import CircularProgress from '@mui/material/CircularProgress';

// components
import Button from './Button';


function PlayButton() {
  const player = usePlayer()

  const isStreamDisabled = !player.state.available || player.state.stream_connecting
  // || (!player.state.loaded && player.state.closed?.code !== 1005)

  return (
    <div>

      <Button
        onClick={() => player.cls.switchConnection()}
        tooltip="Play/Stop"
        disabled={isStreamDisabled}>
        {isStreamDisabled ? (
          <CircularProgress size={15} color="inherit" />
        ) : (
          <Icon>
            {player.state.active ? 'pause' : 'play_arrow'}
          </Icon>
        )}
      </Button>
    </div>
  )
}

export default PlayButton
