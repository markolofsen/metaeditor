import * as React from 'react';

// context
import { usePlayer, useSystem } from '../../../context/';

// ui
import Button from 'rsuite/Button';

// snippets
import { CommandsList } from '../snippets/CommandsList'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {
  const player = usePlayer()
  const system = useSystem()


  return (
    <div>

      <div>

        <Button onClick={() => player.cls.switchStart()}>
          Start / stop
        </Button>

        <br />

        <Button onClick={() => player.cls.methods.commands.clean()}>
          Remove commands
        </Button>

        <Button onClick={() => player.cls.methods.callbacks.clean()}>
          Remove callbacks
        </Button>
      </div>

      <CommandsList list={system.cls.commands_system} />

    </div>
  )
}