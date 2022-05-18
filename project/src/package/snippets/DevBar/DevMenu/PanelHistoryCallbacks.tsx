import * as React from 'react'

// context
import { usePlayer } from '../../../context/';

// components
import JsonViewer from '../../../components/JsonViewer'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {

  const player = usePlayer()

  return (
    <div>
      <JsonViewer data={player.state?.callbacks_list} />
    </div>
  )
}