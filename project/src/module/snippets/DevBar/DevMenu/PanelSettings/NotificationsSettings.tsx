import * as React from 'react'

// context
import { useSystem } from '../../../../context/'

// ui
import ButtonToolbar from 'rsuite/ButtonToolbar';
import SelectPicker from 'rsuite/SelectPicker';
import Button from 'rsuite/Button';
import Notification from 'rsuite/Notification';
import toaster from 'rsuite/toaster';


interface Props {
  // children: any
}

export const NotificationsSettings: React.FC<Props> = () => {

  const system = useSystem()

  const [data, setData] = React.useState<any>({
    type: 'info',
    header: 'Some title',
  });

  const message = (
    <Notification type={data.type} header={data.header} closable>
      {/* <Placeholder.Paragraph rows={3} /> */}
      {/* <JsonViewer data={{ ok: true }} /> */}
    </Notification>
  );


  return (
    <div>

      {message}

      <ButtonToolbar>
        <SelectPicker
          value={data.type}
          data={[
            { label: 'Test command', value: 'info' },
            { label: 'Test callback', value: 'success' },
            // { label: 'warning', value: 'warning' },
            // { label: 'error', value: 'error' }
          ]}
          onChange={(type, event: any) => {
            setData({
              type,
              header: event.target.innerText,
            })
          }}
        />
        <SelectPicker
          defaultValue={system.notifications.placementValue}
          data={system.notifications.placementsList}
          onChange={(v) => {
            system.notifications.updatePlacement(v)
          }}
        />
        <Button onClick={() => toaster.push(message, { placement: system.notifications.placementValue })}>Push</Button>
      </ButtonToolbar>

      <ButtonToolbar>
        <Button onClick={() => toaster.remove('')}>Remove</Button>
        <Button onClick={() => toaster.clear()}>Clear</Button>
      </ButtonToolbar>

    </div>
  )
}