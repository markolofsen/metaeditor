import React from "react"

// @common
import { useApi } from '../../@common/hooks/'


const actions = () => {
  const api = useApi()
  const refInterval = React.useRef(null)
  const refKillInterval = React.useRef(null)

  const [state, setState] = React.useState({
    auto_connect: null,
    loaded: false,

    status: undefined,
    host: undefined,
    port: undefined,
    que: undefined,

    seconds_to_kill: undefined,
    seconds_to_start: undefined,
  })

  const dispatch = (payload) => {
    setState(c => ({
      ...c,
      ...payload,
    }))
  }

  React.useEffect(() => {

    return () => {
      handleStop()
    }

  }, [])

  const handleStop = () => {
    clearInterval(refInterval.current)
    clearInterval(refKillInterval.current)
  }

  const cls = new class {

    constructor() {
      this.MIN_SECONDS_TO_KILL = 100
      this.state = state
    }

    setAutoConnect(auto_connect) {
      dispatch({ auto_connect })
    }

    handleConnection({ host, port }) {
      if (host) {
        dispatch({ host })
      }
      if (port) {
        dispatch({ port })
      }
    }

    manualConnection({ host, port }) {
      dispatch({ loaded: true, status: 'localhost', host, port })
    }

    async startSessionUuuid(sessionUuid, { onSuccess, onError }) {
      handleStop()

      const requestLoop = async () => {

        await api.sessionRead(sessionUuid)
          .then(res => {
            if (res.ok) {
              const { metadata, stream_data } = res.body
              const { host, port, que, seconds_to_kill, seconds_to_start, status } = stream_data
              const data = { host, port, que, seconds_to_kill, seconds_to_start, status }
              dispatch(data)

              if (status === 'active') {
                clearInterval(refInterval.current)
                this.onTimeToKill()
              }

              onSuccess(metadata)
            } else {
              onError()
            }
          }).catch(err => {
            throw new Error(err);
          })

      }

      dispatch({ loaded: true })

      refInterval.current = setInterval(() => requestLoop(), 1000 * 3)
      await requestLoop()
    }

    async getSessionData(buildId) {
      return await api.sessionCreate(buildId).then(res => {
        if (res.ok) {
          return res.body
        }
        return false
      }).catch(err => {
        throw new Error(err);
      })
    }

    async onRestartStream() {

      // await this.request.delete()
      //   .then(res => {
      //     // setTimeout(onRequestStream, 1000 * 1) // Delay: hack for stream server
      //     document.location.reload();
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.onRestartStream()
      //   });

    }

    async onTimeToKill() {
      clearInterval(refKillInterval.current)

      // const init = async () => {
      //   await this.request.get()
      //     .then(res => {

      //       // console.warn('onTimeToKill()', json);
      //       dispatch(res.body)

      //     })
      //     .catch(err => {
      //       console.log(err)
      //     });
      // }

      // refKillInterval.current = setInterval(init, 1000 * 10)
    }

  }

  return cls
};

export default actions
