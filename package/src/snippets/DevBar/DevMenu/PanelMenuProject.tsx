import * as React from 'react'

// context
import { useSystem } from '../../../context/';

// snippets
import { CommandsList } from '../snippets/CommandsList'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {
  const system = useSystem()

  return (
    <div>

      <CommandsList list={system.cls.commands_project} />

    </div>
  )
}