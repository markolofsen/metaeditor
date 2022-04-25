import * as React from 'react';

// blocks
import useOffline from './useOffline'
import useSlowConnection from './useSlowConnection'
import useKillStream from './useKillStream'
import useEventsTrigger from './useEventsTrigger'


function useNotifyController() {
  useOffline()
  useSlowConnection()
  useKillStream()
  useEventsTrigger()
}

export default useNotifyController
