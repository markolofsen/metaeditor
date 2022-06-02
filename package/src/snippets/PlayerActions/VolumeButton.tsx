import * as React from 'react'

// context
import { usePlayer } from '../../context/';

// ui
import { jss } from '../../assets/styled';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';
import Slider from 'rsuite/Slider';

// components
import { SvgIcon } from '../../components/SvgIcon'


const useStyles = jss({
  popover: {
    width: 150,
    padding: 10,
  }
})

export const VolumeButton = () => {
  const classes = useStyles()
  const player = usePlayer()
  const refWhisper = React.useRef<any>(null)

  const { active } = player.computed.streaming

  const soundButtonDisabled = !active
  const volume = player.state.playerSettings.volume
  const volumeOff = typeof volume === 'number' && volume <= 0

  const renderSpeacker = () => {
    return (
      <Popover title="Volume">
        <div className={classes.popover}>
          <Slider
            getAriaValueText={(int: number) => `${int * 100}%`}
            tooltip={false}
            min={0}
            max={1}
            step={.1}
            value={player.state.playerSettings?.volume}
            onChange={(v: number) => player.cls.changeVolume(v)}
          />
        </div>
      </Popover>
    )
  }

  return (

    <div>
      <Whisper
        ref={refWhisper}
        placement="left"
        trigger="hover"
        enterable
        disabled={soundButtonDisabled}
        speaker={renderSpeacker()}>

        <div>
          <SvgIcon
            button
            buttonSize='lg'
            name={volumeOff ? 'volumeOff' : 'volumeOn'}
            disabled={soundButtonDisabled}
            onClick={() => {
              const v = volume === 0 ? 1 : 0
              player.cls.changeVolume(v)
            }} />
        </div>

      </Whisper>


    </div>
  )
}