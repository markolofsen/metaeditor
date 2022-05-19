import * as React from 'react'

// context
import { usePlayer } from '../../context/';

// components
import { SvgIcon } from '../../components/SvgIcon'

// hooks
import { useFullscreen } from './useFullscreen'

interface Props {
  // children: any
}

export const PlayerActions: React.FC<Props> = () => {
  const player = usePlayer()
  const fullscreen = useFullscreen();

  const { _allowPlay, active } = player.computed.streaming
  const playButtonDisabled = !_allowPlay && !active
  const soundButtonDisabled = !active

  const volume = player.state.playerSettings.volume
  const volumeOff = typeof volume === 'number' && volume <= 0



  return (
    <>

      <SvgIcon button buttonSize='lg'
        name={active ? 'pause' : 'play'}
        disabled={playButtonDisabled}
        onClick={() => {
          player.cls.switchStart()
        }} />

      <SvgIcon button buttonSize='lg'
        name={volumeOff ? 'volumeOff' : 'volumeOn'}
        disabled={soundButtonDisabled}
        onClick={() => {
          const v = volume === 0 ? 1 : 0
          player.cls.changeVolume(v)
        }} />

      <SvgIcon button buttonSize='lg'
        name={fullscreen.active ? 'compress' : 'expand'}
        onClick={() => {
          if (fullscreen.active) {
            fullscreen.close()
          } else {
            fullscreen.open()
          }
        }} />

      <SvgIcon button buttonSize='lg' name='qrcode' disabled />

    </>
  )
}