import React from "react"

// libs
import { Request } from '../../common/libs/'


const actions = () => {
  const refInterval = React.useRef(null)
  const refKillInterval = React.useRef(null)

  const [state, setState] = React.useState({
    auto_connect: false,
    loaded: false,

    status: undefined,
    entry_id: undefined,
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
      this.apiUrl = false
    }

    get request() {

      return {
        delete: async () => Request.DELETE(this.apiUrl),
        get: async () => Request.GET(this.apiUrl),
      };
    }

    initConnection() {
      if (state.status === 'active') {
        window.ps_init()
      }
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

    async onRequestStream(apiUrl) {

      this.apiUrl = apiUrl

      handleStop()

      dispatch({ auto_connect: true })

      const onStartStream = async () => {

        await this.request.get()
          .then(res => {

            if (res.status === 200) {

              dispatch(res.body)

              if (res.body?.status === 'active') {
                clearInterval(refInterval.current)
                this.onTimeToKill()
                this.initConnection()
              }

            }


          })
          .catch(err => {
            console.log(err)
          });
      }

      await onStartStream()
      dispatch({ loaded: true })

      refInterval.current = setInterval(() => onStartStream(), 1000 * 3)
    }

    async onRestartStream() {

      await this.request.delete()
        .then(res => {
          // setTimeout(onRequestStream, 1000 * 1) // Delay: hack for stream server
          document.location.reload();
        })
        .catch(err => {
          console.log(err)
          this.onRestartStream()
        });

    }

    async onTimeToKill() {
      clearInterval(refKillInterval.current)

      const init = async () => {
        await this.request.get()
          .then(res => {

            // console.warn('onTimeToKill()', json);
            dispatch(res.body)

          })
          .catch(err => {
            console.log(err)
          });
      }

      refKillInterval.current = setInterval(init, 1000 * 10)
    }

  }

  return cls
};

export default actions
