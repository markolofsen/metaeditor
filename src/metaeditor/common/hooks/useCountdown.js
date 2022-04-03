import React from "react";

// libs
import moment from "moment";


function useCountdown() {
  const refInterval = React.useRef(null)
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    return () => {
      cls.stop()
    }
  }, [])

  const cls = new class {

    get value() {
      return value;
    }

    stop() {
      setValue(0)
      clearInterval(refInterval.current)
    }

    start(seconds) {

      if (typeof seconds !== 'number' || seconds < 0) return
      if (refInterval.current) return

      const startTime = moment()
      const targetTime = startTime.add(seconds, 'seconds')

      clearInterval(refInterval.current)
      refInterval.current = setInterval(() => {

        const totalSeconds = seconds
        const leftSeconds = moment.duration(targetTime.diff(moment())).asSeconds();

        const relDiff = (a, b) => Math.round(((a - b) / a) * 100)
        const percentage = relDiff(totalSeconds, leftSeconds)

        if (percentage >= 100) {
          clearInterval(refInterval.current)
          setValue(100)
          return;
        }

        setValue(percentage)

      }, 100)

    }
  }

  return cls
};

export default useCountdown
