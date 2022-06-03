import * as React from 'react'

// pixel-streaming
import * as client from 'unreal-pixel-streaming'
import { psConfigSchema } from '../client/'

// context
import { usePlayer, useSystem } from '../context/';

// ui
import { jss } from '../assets/styled';

// blocks
import { DebugPanel } from './DevBar/DevMenu/PanelPixelStreaming/DebugPanel'
import { DevBar } from './DevBar'
import { PlayerOverlay } from './PlayerOverlay'
import { PlayerActions } from './PlayerActions'
import { QuickMenu } from './QuickMenu/'
import { ProgressKiller } from './ProgressKiller'

// styles
import { global } from '../styles/theme';

const useStyles = jss({
  ...global,

  root: {
    margin: 0,
    backgroundColor: 'black',
    height: 'var(--window - height)',
    overflow: 'hidden',
    '& #player': {
      '& video': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50,
        zIndex: 0,
        objectFit: `var(--player-object-fit)`,
        cursor: 'pointer',
      }
    },
  },
  toolbar: {
    position: 'fixed',
    zIndex: 1050 - 1,
    top: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
})


interface metaConfigSchema {
  showToolbar: boolean,
  showQuickMenu: boolean,
  showDevBar: boolean,
  showOverlay: boolean,
  notifications: {
    showCommands: boolean,
    showCallbacks: boolean,
    placement: string,
  },
  videoUrl?: string,
  issuesUrl?: string,
}

interface configSchema {
  // streamingUrl?: string,
  secondsToKill: number,
  secondsToStart: number,
  autoRestart: boolean,
}

export interface PlayerPropsSchema {
  children?: JSX.Element | React.ReactNode,
  apiKey?: string,
  buildId?: string,
  metaConfig: metaConfigSchema,
  config: configSchema,
  psConfig: psConfigSchema,
  ueSettings: {
    Encoder: client.Encoder,
    WebRTC: client.WebRTC,
    Console: {
      mode: 'console' | 'command',
      cursor: boolean,
      hudSats: boolean,
    }
  }
}

export const Player: React.FC<any> = (props: PlayerPropsSchema) => {
  const classes = useStyles()
  const player = usePlayer()
  const system = useSystem()

  let { apiKey, metaConfig, config, psConfig, ueSettings } = props
  const [inited, setInited] = React.useState(false)

  React.useEffect(() => {

    system.cls.setApiKey(apiKey)
    system.cls.initMetaConfig(metaConfig)
    player.cls.initConfig(config, psConfig, ueSettings)

  }, [])

  /**
   * Enrich config from system context
   */
  React.useEffect(() => {

    if (inited === false && system.project.config) {

      const { menu, ue_console_mode, ue_control_scheme, ue_sound } = system.project.config
      system.cls.initMetaConfig({ showQuickMenu: menu })
      ueSettings.Console.mode = ue_console_mode
      psConfig.controlScheme = ue_control_scheme
      psConfig.startVideoMuted = !ue_sound

      setInited(true)
      player.cls.initConfig(config, psConfig, ueSettings)
    }

  }, [system.project.config])


  return (
    <div className={classes.root}>
      <div id="player" />
      <DebugPanel isFirst />

      {system.config.showOverlay && (<PlayerOverlay />)}
      {system.config.showQuickMenu && (<QuickMenu />)}

      <ProgressKiller />

      {(system.config.showToolbar || system.config.showDevBar) && (
        <div className={classes.toolbar} id="metaeditor-toolbar">
          {system.config.showDevBar && (<DevBar />)}
          {system.config.showToolbar && (<PlayerActions />)}
        </div>
      )}

    </div>
  )
}