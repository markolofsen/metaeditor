import React from 'react'

// ui
import Button from 'rsuite/Button'

// libs
import { usePlayer } from 'pixel-streaming'


export const CommandsSystem: React.FC<any> = () => {
  const player = usePlayer()

  const emitCommandSystem = (commandName: string, value: any) => async () => {
    player.cls.emitCommandSystem(commandName, value)
  }

  return (
    <div>

      <h5>
        System Commands
      </h5>

      <div data-actions>
        <Button appearance='primary' onClick={emitCommandSystem('debug_mode', { mode: 'off' })}>
          Debug: off
        </Button>
        <Button appearance='primary' onClick={emitCommandSystem('debug_mode', { mode: 'on' })}>
          Debug: on
        </Button>
      </div>

    </div>
  )
}