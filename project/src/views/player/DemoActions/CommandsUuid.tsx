import React from 'react'

// ui
import Button from 'rsuite/Button'

// libs
import { usePlayer } from 'pixel-streaming'


export const CommandsUuid: React.FC<any> = () => {
  const player = usePlayer()

  const [disabled, setDisabled] = React.useState<boolean>(false)

  const emitUuidAsync = (commandUuid: string) => async () => {
    setDisabled(true)
    await player.cls.emitUuidAsync(commandUuid).then((res: any) => {
      if (res) {
        console.log('@@@callback', JSON.stringify(res, null, 4))
      }
    })
    setDisabled(false)
  }

  return (
    <div>

      <h5>
        Portal Commands
      </h5>

      <div data-actions>
        <Button appearance='primary' disabled={disabled} onClick={emitUuidAsync('b355d3')}>
          Color: white
        </Button>
        <Button appearance='primary' disabled={disabled} onClick={emitUuidAsync('7224e7')}>
          Color: black
        </Button>
      </div>

    </div>
  )
}