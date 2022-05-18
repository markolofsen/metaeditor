import * as React from 'react'

// context
import { useSystem } from '../../../../context/'

// ui
import Form from 'rsuite/Form';
import Toggle from 'rsuite/Toggle';

// blocks
import { NotificationsSettings } from './NotificationsSettings'


interface Props {
  // children: any
}

export const Panel: React.FC<Props> = () => {
  const system = useSystem()

  return (
    <div>

      <Form.Group>
        <Form.ControlLabel>System Notifications</Form.ControlLabel>
        {/* <Form.Control /> */}
        <div style={{ display: 'flex', gap: 5, paddingTop: 10 }}>

          <Toggle
            checked={system.notifications.showCommands}
            onChange={v => system.notifications.updateCommands(v)}
            size="lg"
            checkedChildren="Commands: on"
            unCheckedChildren="Commands: off" />

          <Toggle
            checked={system.notifications.showCallbacks}
            onChange={v => system.notifications.updateCallbacks(v)}
            size="lg"
            checkedChildren="Callbacks: on"
            unCheckedChildren="Callbacks: off" />

        </div>

        {/* <Form.HelpText>Username is required</Form.HelpText> */}
      </Form.Group>

      <div style={{ paddingTop: 20 }}>
        <NotificationsSettings />
      </div>

    </div>
  )
}