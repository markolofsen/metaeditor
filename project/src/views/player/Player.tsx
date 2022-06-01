import React from 'react'

// libs
import { Player, ContextProvider, usePlayer, useSystem, PlayerPropsSchema } from 'pixel-streaming'

// blocks
import { DemoActions } from './DemoActions'

interface Props {
  build: string
  showQuickMenu?: boolean
  consoleMode?: 'console' | 'command'
}

const PlayerContext: React.FC<Props> = (props: Props) => {
  const { build, showQuickMenu, consoleMode } = props

  const player = usePlayer()
  const system = useSystem()

  React.useEffect(() => {

    if (player.cls.initReady) {
      // player.cls.initPlayer('https://i-00c56684d4fff23e4.cloudvec.com')
      system.cls.connectBuild(build)
    }

  }, [player.cls.initReady])

  // Disable cursor
  React.useEffect(() => {

    if (player.computed.streaming.active) {
      player.cls.emitCommandSystem('cursor', { enabled: false })
    }

  }, [player.computed.streaming.active])



  let config = playerConfig

  if (typeof showQuickMenu === 'boolean') {
    config.metaConfig.showQuickMenu = showQuickMenu
  }

  if (typeof consoleMode === 'string') {
    config.ueSettings.Console.mode = consoleMode
  }

  return (
    <div>
      <DemoActions />
      <Player {...config} />
    </div>
  )

}

const playerConfig: PlayerPropsSchema = {
  // apiKey: '3e9e49c6-60eb-469b-80b6-9a9b53fa7f73',
  metaConfig: {
    showToolbar: true,
    showQuickMenu: true,
    showDevBar: true,
    showOverlay: true,
    notifications: {
      showCommands: false,
      showCallbacks: false,
      placement: 'topStart',
    },
    videoUrl: null,
    issuesUrl: 'https://github.com/markolofsen/metaeditor/discussions',
  },
  config: {
    secondsToKill: 60 * 5,
    secondsToStart: 0,
    autoRestart: true,
  },
  psConfig: {
    enableVerboseLogging: false,
    enableSpsAutoplay: true,
    startVideoMuted: false,
    controlScheme: 1,
    suppressBrowserKeys: true,
    fakeMouseWithTouches: true,
  },
  ueSettings: {
    Encoder: {
      TargetBitrate: -1,
      MaxBitrate: 20000000,
      MinQP: 0, //-1
      MaxQP: 51, //-1
      RateControl: 'CBR', //"CBR" | "VBR" | "ConstQP"
      FillerData: true,
      MultiPass: 'FULL', //"DISABLED" | "QUARTER" | "FULL";
    },
    WebRTC: {
      DegradationPref: 'MAINTAIN_FRAMERATE', //"BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION";
      MinBitrate: 100000,
      MaxBitrate: 20000000,
      LowQP: 25,
      HighQP: 37,
      MaxFPS: 30,
      FPS: 30,
    },
    Console: {
      mode: 'command', // 'console'
      cursor: false,
      hudSats: false,
    }
  }
}

const CustomPlayer: React.FC<any> = ({ build, showQuickMenu, consoleMode }: Props) => (
  <ContextProvider>
    <PlayerContext
      build={build}
      showQuickMenu={showQuickMenu}
      consoleMode={consoleMode} />
  </ContextProvider>
)

export default CustomPlayer
