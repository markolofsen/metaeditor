import * as React from 'react'

// context
import { usePlayer } from '../../context/';

// components
import { SvgIcon } from '../../components/SvgIcon'

// hooks
import { useFullscreen } from './useFullscreen'

// blocks
import { ShareLink } from './ShareLink'
import { VolumeButton } from './VolumeButton'
import { Helpers } from './Helpers/'

interface Props {
  // children: any
}

export const PlayerActions: React.FC<Props> = () => {
  const player = usePlayer()
  const fullscreen = useFullscreen();

  const { _allowPlay, active } = player.computed.streaming
  const playButtonDisabled = !_allowPlay && !active

  return (
    <>

      <SvgIcon button buttonSize='lg'
        name={active ? 'pause' : 'play'}
        disabled={playButtonDisabled}
        onClick={() => {
          player.cls.switchStart()
        }} />

      <VolumeButton />

      <SvgIcon button buttonSize='lg'
        name={fullscreen.active ? 'compress' : 'expand'}
        onClick={() => {
          if (fullscreen.active) {
            fullscreen.close()
          } else {
            fullscreen.open()
          }
        }} />

      <ShareLink />

      <Helpers.KeyboardHelper />

    </>
  )
}