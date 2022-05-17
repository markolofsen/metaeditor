import * as React from 'react'

// blocks
import { DebugPanel } from './DebugPanel'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {

  return (
    <div>
      <DebugPanel />
    </div>
  )
}