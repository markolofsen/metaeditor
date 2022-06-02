import React from 'react'

// libs
import { Player, ContextProvider, usePlayer, useSystem, PlayerPropsSchema } from 'pixel-streaming'

// blocks
import { DemoActions } from './DemoActions'

interface Props {
  build: string
}

const PlayerContext: React.FC<Props> = (props: Props) => {
  const { build } = props

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


  // Update config from MetaAPI
  React.useEffect(() => {
    if (system.project.config) {
      let cfg = playerConfig

      const { menu, ue_console_mode, ue_control_scheme, ue_sound } = system.project.config

      cfg.metaConfig.showQuickMenu = menu
      cfg.ueSettings.Console.mode = ue_console_mode
      cfg.psConfig.controlScheme = ue_control_scheme

      cfg.psConfig.startVideoMuted = !ue_sound

      const { config, psConfig, ueSettings } = cfg

      player.cls.streamingStop()
      player.cls.initConfig(config, psConfig, ueSettings)
      player.cls.streamingConnect()

    }

  }, [system.project.config])

  return (
    <div>
      <DemoActions />
      <Player {...playerConfig} />
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

const CustomPlayer: React.FC<any> = ({ build }: Props) => (
  <ContextProvider>
    <PlayerContext build={build} />
  </ContextProvider>
)

export default CustomPlayer
