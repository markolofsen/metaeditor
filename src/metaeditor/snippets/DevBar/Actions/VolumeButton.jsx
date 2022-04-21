import * as React from 'react';

// context
import { usePlayer } from '../../../context/';

// material
import Icon from '@mui/material/Icon';

// components
import Button from './Button';


function VolumeButton() {
  const player = usePlayer()

  const isDisabled = !player.state.loaded

  return (
    <div>
      <Button
        onClick={() => player.cls.setVolume(player.state.settings.volume === 1 ? 0 : 1)}
        tooltip="Volume"
        disabled={isDisabled}>
        <Icon>
          {player.state.settings.volume ? 'volume_up' : 'volume_off'}
        </Icon>
      </Button>
    </div>
  )
}

export default VolumeButton
