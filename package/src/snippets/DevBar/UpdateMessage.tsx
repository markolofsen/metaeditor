
import * as React from 'react'

// ui
import Message from 'rsuite/Message';
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
      <Message showIcon type="error" header={<strong>Need update</strong>}>
        current version: {data?.current}
        <br />
        new version: {data?.release}
        <br />
        <Button appearance='ghost'>
          Update now
        </Button>
      </Message>
    </div>
  )
}