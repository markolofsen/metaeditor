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

      <Button block style={{ marginBottom: 20 }} onClick={() => player.cls.switchStart()}>
        Start / stop
      </Button>

      <CommandsList list={system.cls.commands_system} />

    </div>
  )
}