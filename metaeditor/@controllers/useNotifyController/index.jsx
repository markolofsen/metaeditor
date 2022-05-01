import * as React from 'react';

// blocks
import useOffline from './useOffline'
import useSlowConnection from './useSlowConnection'
import useKillStream from './useKillStream'
import useEventsTrigger from './useEventsTrigger'


export default function useNotifyController() {
  useOffline()
  useSlowConnection()
  useKillStream()
  useEventsTrigger()
}
