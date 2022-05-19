import * as React from "react";

// pixel-streaming
import { Logger } from "unreal-pixel-streaming";

// libs
import moment from 'moment';


export const useCountdown = () => {
  const refInterval = React.useRef<any>(null)

  const [data, setData] = React.useState<any>({
    active: false,
    percent: 0,
    leftSeconds: 0,
  })

  React.useEffect(() => {
    return () => {
      cls.stop()
    }
  }, [])

  // React.useEffect(() => {
  //   if (data.active && data.percent > 0) {
  //     Logger.infoLog('Countdown: ' + data.percent);
  //   }
  // }, [data.percent])

  const cls = new class {

    get active() {
      return data.active;
    }

    get percent() {
      return data.percent;
    }

    get leftSeconds() {
      return data.leftSeconds;
    }

    get time() {
      const sec = data.leftSeconds
      return moment.utc(sec * 1000).format('mm:ss');
    }

    stop() {
      setData({ active: false, percent: 0, leftSeconds: 0 })
      clearInterval(refInterval.current)
    }

    start(seconds: number) {

      if (typeof seconds !== 'number' || seconds < 0) return
      if (data.active) return

      const startTime = moment()
      const targetTime = startTime.add(seconds, 'seconds')

      clearInterval(refInterval.current)
      refInterval.current = setInterval(() => {

        const totalSeconds = seconds
        const leftSeconds = moment.duration(targetTime.diff(moment())).asSeconds();

        const relDiff = (a: number, b: number) => Math.round(((a - b) / a) * 100)
        const percent = relDiff(totalSeconds, leftSeconds)

        if (percent >= 100) {
          clearInterval(refInterval.current)
          setData({ active: false, percent: 100, leftSeconds: 0 })
          return;
        }

        setData({ active: true, percent, leftSeconds })

      }, 100)

    }
  }

  return cls
};
