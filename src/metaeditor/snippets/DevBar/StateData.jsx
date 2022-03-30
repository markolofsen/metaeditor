import * as React from 'react';

// context
import { usePlayer } from '../../context/';

// components
import JsonEditor from '../../components/JsonEditor/'

function StateData() {
  const player = usePlayer()

  return (
    <JsonEditor
      label="State data"
      content={player.state}
      height={'100%'}
      onChange={() => { }}
      viewOnly
    />
  )
}

export default StateData
