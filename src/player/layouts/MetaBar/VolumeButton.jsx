import * as React from 'react';

// context
import { usePlayer } from 'metaeditor/context/';

// material
import Icon from '@mui/material/Icon';

// components
import Button from './components/Button';


function VolumeButton() {
  const player = usePlayer()

  const isDisabled = !player.state.loaded || !player.state.body_clicked

  return (
    <div>
      <Button
        onClick={() => player.cls.changeVolume()}
        tooltip="Volume"
        disabled={isDisabled}>
        <Icon>
          {player.state.volume ? 'volume_up' : 'volume_off'}
        </Icon>
      </Button>
    </div>
  )
}

export default VolumeButton
