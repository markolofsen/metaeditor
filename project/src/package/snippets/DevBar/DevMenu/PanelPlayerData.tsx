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

  const renderState = () => {
    const res = player.state
    delete res.callbacks_list
    delete res.commands_list
    // delete res.sessionData
    return res
  }
  return (
    <div>
      <JsonViewer data={renderState()} />
    </div>
  )
}