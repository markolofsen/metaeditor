import * as React from 'react'

// context
import { useSystem } from '../../../context/';

// components
import JsonViewer from '../../../components/JsonViewer'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {
  const system = useSystem()

  return (
    <div>
      <JsonViewer data={system.state} />
    </div>
  )
}