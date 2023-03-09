import * as React from 'react'
import { useRouter } from 'next/router'

// libs
import { PlayerConfigProps } from 'pixel-streaming'

// snippets
import Player from 'src/snippets/Player'
import defaultConfig from 'src/snippets/Player/defaultConfig'

export default function Page() {

  const router = useRouter()

  // states
  const [mounted, setMounted] = React.useState(false)
  const [config, setConfig] = React.useState<PlayerConfigProps>(defaultConfig)

  React.useEffect(() => {
    if (!router.isReady) return

    let newCfg: PlayerConfigProps = defaultConfig

    let cfg = localStorage.getItem('playerConfig')
    if (cfg) {
      newCfg = {
        ...newCfg,
        ...JSON.parse(cfg),
      }
    }

    const psHost = router.query.ss
    if (psHost) {
      newCfg.psHost = psHost as string
    }

    // alert(JSON.stringify(mergedConfig, null, 2))
    setConfig(newCfg)
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