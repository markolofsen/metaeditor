import React from 'react'

// ui
import Button from 'rsuite/Button'

// libs
import { usePlayer } from 'pixel-streaming'


export const CommandsAsync: React.FC<any> = () => {
  const player = usePlayer()

  const [disabled, setDisabled] = React.useState<boolean>(false)

  const emitAsyncCommand = (commandName: string, value: any) => async () => {
    setDisabled(true)
    await player.cls.emitAsyncCommand(commandName, value).then((res: any) => {
      if (res) {
        console.log('@@@callback', JSON.stringify(res, null, 4))
      }
    })
    setDisabled(false)
  }

  return (
    <div>

      <h5>
        Async Commands
      </h5>

      <div data-actions>
        <Button appearance='primary' disabled={disabled} onClick={emitAsyncCommand('switchvariant', { set: 0, index: 2 })}>
          Color: white
        </Button>
        <Button appearance='primary' disabled={disabled} onClick={emitAsyncCommand('switchvariant', { set: 0, index: 1 })}>
          Color: black
        </Button>
      </div>

    </div>
  )
}