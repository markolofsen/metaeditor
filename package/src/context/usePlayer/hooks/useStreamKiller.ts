import * as React from "react"

// pixel-streaming
import { ClientAccess, Logger } from '../../../client/'

export const useStreamKiller = (dispatch: any, streamingActive: boolean, config: any) => {

  const secondsToKill: number = Math.round(config.secondsToKill)

  const refTimer = React.useRef<any>(null)
  const refInterval = React.useRef<any>(null)
  const refIntervalSec = React.useRef<any>(0)

  React.useEffect(() => {
    return () => {
      handleStop()
    }
  }, [])

  const handleStop = () => {
    clearTimeout(refInterval.current)
    clearTimeout(refTimer.current)
    dispatch.updateConfig({ secondsToKillLeft: null })
  }

  // Initialization when streaming is active and secondsToKill > 0
  React.useEffect(() => {

    if (typeof secondsToKill !== 'number' || secondsToKill <= 0) return

    if (streamingActive) {

      if (typeof secondsToKill === 'number' && secondsToKill > 0) {
        clearTimeout(refTimer.current)
        clearInterval(refInterval.current)

        refIntervalSec.current = Math.round(secondsToKill)

        refInterval.current = setInterval(() => {
          refIntervalSec.current -= 1
          dispatch.updateConfig({ secondsToKillLeft: refIntervalSec.current })
          // Logger.verboseLog('Seconds to kill: ' + refIntervalSec.current);
        }, 1000)

        refTimer.current = setTimeout(() => {
          clearInterval(refInterval.current)
          Logger.verboseLog('Connection killed');
          ClientAccess.close()
        }, 1000 * secondsToKill)
      }

    } else {

      handleStop()

    }


  }, [config.secondsToKill, streamingActive])


}