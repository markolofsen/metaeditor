import * as React from 'react'

// libs
import { PlayerConfigProps } from 'pixel-streaming'

// components
import Player from 'src/components/Player'
import defaultConfig from 'src/components/Player/defaultConfig'

export default function Page() {

  const [mounted, setMounted] = React.useState(false)
  const [config, setConfig] = React.useState<PlayerConfigProps>(defaultConfig)

  React.useEffect(() => {
    let cfg = localStorage.getItem('playerConfig')
    if (cfg) {
      const jsonConfig = JSON.parse(cfg)

      const mergedConfig: PlayerConfigProps = {
        ...defaultConfig,
        ...jsonConfig,
      }

      // alert(JSON.stringify(mergedConfig, null, 2))
      setConfig(mergedConfig)
    }

    setMounted(true)

  }, [])

  // return (
  //   <div>
  //     <pre>
  //       {JSON.stringify(config, null, 2)}
  //     </pre>
  //   </div>
  // )

  if (!mounted) {
    return (<div />)
  }

  return (
    <div>
      <Player config={config} />
    </div>
  )
}