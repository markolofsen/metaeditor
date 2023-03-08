import * as React from 'react'
import { useRouter } from 'next/router'

// libs
import { PlayerConfigProps } from 'pixel-streaming'

// components
import Player from 'src/components/Player'
import defaultConfig from 'src/components/Player/defaultConfig'

export default function Page() {

  const router = useRouter()

  // states
  const [mounted, setMounted] = React.useState(false)
  const [config, setConfig] = React.useState<PlayerConfigProps>(defaultConfig)

  const applyConfig = (cfg: object) => {
    const mergedConfig: PlayerConfigProps = {
      ...defaultConfig,
      ...cfg,
    }

    // alert(JSON.stringify(mergedConfig, null, 2))
    setConfig(mergedConfig)
  }

  React.useEffect(() => {
    if (!router.isReady) return

    let cfg = localStorage.getItem('playerConfig')
    if (cfg) {
      const jsonConfig = JSON.parse(cfg)
      applyConfig(jsonConfig)

    } else {
      const psHost = router.query.ss
      if (psHost) {
        applyConfig({
          psHost,
        })
      }
    }

    setMounted(true)

  }, [router.isReady])

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