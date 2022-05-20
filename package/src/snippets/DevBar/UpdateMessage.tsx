
import * as React from 'react'

// config
import { config } from '../../assets/config';

// ui
import Button from 'rsuite/Button';

// context
import { useSystem } from '../../context/';


export const UpdateMessage: React.FC = () => {
  const system = useSystem()

  const data = system.cls.apiData.module

  if (!data?.update) {
    return <div />
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Button color="red" appearance="primary" block href={config.updateUrl} target="_blank">
        Update MetaEditor to v{data?.release}
      </Button>
    </div>
  )
}