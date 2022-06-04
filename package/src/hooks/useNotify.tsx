import * as React from 'react'

// ui
// import Notification from 'rsuite/Notification';
import Message from 'rsuite/Message';
import toaster from 'rsuite/toaster';


interface IToaster {
  placement: 'topCenter' | 'bottomCenter' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd'
}

export const useNotify = () => {
  const message = new class {

    clear() {
      // toaster.remove('')
      toaster.clear()
    }

    push(children: any, options: unknown, settings: IToaster) {
      const message = (
        <Message {...options}>
          {children}
        </Message>
      )

      toaster.push(message, settings)
    }

    // info(...args: any) {
    //   this.push('info', ...args)
    // }
  }

  return {
    message,
  }
}