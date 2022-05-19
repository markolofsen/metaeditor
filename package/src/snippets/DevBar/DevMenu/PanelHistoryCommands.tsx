import * as React from 'react'

// context
import { usePlayer } from '../../../context/';

// ui
import Button from 'rsuite/Button';

// components
import JsonViewer from '../../../components/JsonViewer'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {
  const player = usePlayer()

  return (
    <div>
      <Button style={{ marginBottom: 10 }} block onClick={() => player.cls.methods.commands.clear()}>
        Clear
      </Button>

      <JsonViewer data={player.state?.commands_list} />
    </div>
  )
}