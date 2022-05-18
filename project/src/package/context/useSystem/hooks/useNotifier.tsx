import * as React from "react"

// // context
// import { useSystem } from '../../../context/'

// ui
import Notification from 'rsuite/Notification';
import toaster from 'rsuite/toaster';

// pixel-streaming
import * as client from 'unreal-pixel-streaming'

// // components
// import JsonViewer from '../../../components/JsonViewer'


export const useNotifier = () => {
  const refCommand = React.useRef<any>(null)
  const refCallback = React.useRef<any>(null)


  const cls = new class {

    // Hide system messages
    public restricted(payload: any) {
      if (['browser', 'ue'].includes(payload?.initiator)) {
        return false
      }
      return true
    }

    getValue(detail: string) {
      try {
        return JSON.parse(detail)
      } catch (err) {
        console.error('@@@Cant parse event', { detail })
      }
    }

    pushCommand(placement: any, event: any) {
      const payload: client.IBodyCommand = this.getValue(event.detail)
      if (this.restricted(payload)) return

      const message = (
        <Notification type={undefined} header={payload?.command} closable>
          {/* <JsonViewer data={data} style={{
          maxHeight: 100,
          overflow: 'auto'
        }} /> */}
        </Notification>
      );

      // toaster.remove(refCommand.current)
      refCommand.current = toaster.push(message, { placement })

    }

    pushCallback(placement: any, event: any) {
      const payload: client.IBodyCallback = this.getValue(event.detail)
      if (this.restricted(payload)) return

      const message = (
        <Notification type='success' header={payload?.command} closable>
          {/* <JsonViewer data={data} style={{
          maxHeight: 100,
          overflow: 'auto'
        }} /> */}
        </Notification>
      );

      refCallback.current = toaster.push(message, { placement })
    }
  }

  return cls
}