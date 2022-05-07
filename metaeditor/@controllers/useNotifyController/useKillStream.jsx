import React from "react";
import PropTypes from 'prop-types';

// libs
import moment from 'moment'

// hooks
import { useCountdown } from 'metalib/common/hooks/'
import { useNotify } from "../../@common/hooks/";

// context
import { usePlayer, useConnection } from '../../context/';


function useKillStream(props) {
  const notify = useNotify()
  const player = usePlayer()
  const connection = useConnection()

  const [time, setTime] = React.useState(0)

  const secondsToKill = connection.state.seconds_to_kill
  const countdown = useCountdown({ seconds: secondsToKill })

  React.useEffect(() => {
    const newTime = moment().add(secondsToKill, 'seconds').format('HH:mm')
    setTime(newTime)
  }, [countdown.value])

  React.useEffect(() => {

    if (player.state.loaded) {

      if (secondsToKill >= connection.MIN_SECONDS_TO_KILL) {
        countdown.stop()
        cls.hide()
      } else {
        countdown.start()
        cls.show()
      }
    }

  }, [player.state.loaded, secondsToKill])



  const cls = new class {
    constructor() {
      this.key = 'kill-stream'
    }

    show() {
      notify.warning('No activity. The connection will be closed in ' + time, {
        key: this.key,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        autoHideDuration: 1000 * 100,
        // resumeHideDuration: 1000 * 10,
      })
    }
    hide() {
      notify.closeByKey(this.key)
    }
  }

  return;
}

export default useKillStream
