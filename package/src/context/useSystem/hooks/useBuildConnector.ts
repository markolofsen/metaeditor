import * as React from 'react'

// pixel-streaming
import { Logger } from 'unreal-pixel-streaming'

// hooks
import { useApi } from "../../../hooks/useApi"
import { useStorageBook } from '../../../hooks/useStorageBook'

const API_INTERVAL_SEC = 3

export const useBuildConnector = (dispatch: any) => {
  const api = useApi()
  const storageBook = useStorageBook()

  const refInterval = React.useRef<any>(null)

  const [buildId, setBuildId] = React.useState<any>(false)
  const [sessionUuid, setSessionUuid] = React.useState<any>(false)

  React.useEffect(() => {
    return () => {
      clearInterval(refInterval.current)
    }
  }, [])

  React.useEffect(() => {

    if (sessionUuid) {
      clearInterval(refInterval.current)
      cls.readSessionData()

      refInterval.current = setInterval(async () => {
        await cls.readSessionData()
      }, 1000 * API_INTERVAL_SEC)

    }

  }, [sessionUuid])


  const cls = new class {

    async start(buildId: string) {
      setBuildId(buildId)

      if (!this.urlSessionExist) {
        await this.waitSessionData(buildId)
      }
    }

    get urlSessionExist() {
      const params = decodeURI(window.location.search)
        .replace('?', '')
        .split('&')
        .map(param => param.split('='))
        .reduce((values: any, [key, value]) => {
          values[key] = value
          return values
        }, {})

      if (params?.session) {
        setSessionUuid(params.session)
        storageBook.sessionUuid.save(params.session)
        return true
      }

      return false
    }

    async waitSessionData(buildId: string) {

      storageBook.sessionUuid.read((res: any) => {
        if (res) {
          setSessionUuid(res)
          return
        }
      })

      await api.sessionCreate(buildId).then(async res => {
        if (res.ok) {
          const { uuid } = res.body
          if (uuid) {
            setSessionUuid(uuid)
            storageBook.sessionUuid.save(uuid)
          }
        }
        return false
      }).catch(err => {
        throw new Error(err);
      })
    }

    removeSession() {
      Logger.infoLog('Remove session & reinit');
      setSessionUuid(false)
      storageBook.sessionUuid.remove()
      clearInterval(refInterval.current)
      this.waitSessionData(buildId)
    }

    async readSessionData() {
      await api.sessionRead(sessionUuid).then(res => {
        if (res.ok) {
          const { stream_data } = res.body
          // const { host, port, que, seconds_to_kill, seconds_to_start, status } = stream_data
          // const streamingUrl = stream_data.host
          // const secondsToStart = stream_data.seconds_to_start
          // const secondsToKill = stream_data.seconds_to_kill
          const status = stream_data.status

          // console.log('@@status', status)
          // console.log('@@secondsToStart', secondsToStart)

          const sessionData = res.body
          const apiKey = sessionData.metadata?.api_key
          if (apiKey) {
            dispatch.update({ apiKey })
          }

          dispatch.updateSessionData(sessionData)

          if (status === 'active') {
            clearInterval(refInterval.current)
          }

        } else {
          this.removeSession()
        }

      }).catch(err => {
        throw new Error(err);
      })
    }
  }

  return cls
}