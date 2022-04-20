import * as React from 'react';

// blocks
import useOffline from './useOffline'
import useSlowConnection from './useSlowConnection'
import useKillStream from './useKillStream'
import useCommand from './useCommand'


function useNotifyController() {
  useOffline()
  useSlowConnection()
  useKillStream()

  const command = useCommand()

  return {
    sendCommand: payload => {
      command.sendCommand(payload)
    },
    sendCallback: payload => {
      command.sendCallback(payload)
    },
  }
}

export default useNotifyController
