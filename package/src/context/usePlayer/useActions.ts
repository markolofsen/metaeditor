import * as React from 'react'

// reducer
import { useDispatch } from "./useReducer";

// pixel-streaming
import { ClientClass, ClientAccess, EventsClass as Ev } from '../../client/'

// context
import { useSystem } from '../useSystem';

// hooks
import { useResolution } from './hooks/useResolution'
import { useUnload } from '../../hooks/useUnload';
import { useEventListener } from '../../hooks/useEventListener';
import { useCountdown } from '../../hooks/useCountdown';
import { useStreamKiller } from './hooks/useStreamKiller';
import { useUnrealSettings } from './hooks/useUnrealSettings'


export const useActions = () => {
  const system = useSystem()

  const [state, dispatch, eventHandler] = useDispatch()
  const [initReady, setInitReady] = React.useState<any>(false)

  const refTimeoutConfig = React.useRef<any>(null) //hack

  // pixel-streaming events
  useEventListener(Ev.mouseAction.key, (payload: any) => eventHandler.eventMouse(payload));

  useEventListener(Ev.commands.key, (payload: any) => eventHandler.eventCommand(payload));
  useEventListener(Ev.callbacks.key, (payload: any) => eventHandler.eventCallbacks(payload));

  useEventListener(Ev.webrtcStatus.key, (payload: any) => eventHandler.eventWebrtcStatus(payload));
  useEventListener(Ev.ueInitialSettings.key, (payload: any) => eventHandler.eventUeSettingsInitial(payload));

  // prompt before unload
  const unload = useUnload((e: any) => {
    e.preventDefault();
    e.returnValue = '';
  });

  // Computed data for quick access
  const computed = new class {

    get streaming() {
      const { status } = state.webrtcData
      const _s_ = Ev.webrtcStatusList
      const ch = (v: any) => v === status
      let res: any = {
        empty: status === null,
        initializing: ch(_s_.initializing),
        initialized: ch(_s_.initialized),
        active: ch(_s_.active),
        activation: ch(_s_.activation),
        disconnected: ch(_s_.disconnected),
        stopped: ch(_s_.stopped),
        error: ch(_s_.error),
        autoplaySupport: state.webrtcData.autoplaySupport,
        status: status || 'pending',
      }

      // For overlays

      res._inProgress = res.empty || res.activation || res.disconnected
      res._allowPlay = ((res.initialized || res.stopped) && res.autoplaySupport !== true) || res.stopped
      res._playError = res.disconnected || res.error
      res._allowOverlay = !res.active
      res._isPending = res.status === 'pending'

      return res
    }

    get mouse() {
      return {
        moving: state.mouseEvent.moving
      }
    }
  }

  /**
   * Apply Unreal Engine Settings on start
   */
  useUnrealSettings(state, computed.streaming.active)


  /**
   * Resolution adapter
   */
  const resolution = useResolution(state.ueSettings.onStart?.Console)

  /**
   * Auto restart
   */
  React.useEffect(() => {
    // If client not inited yet... return
    if (!ClientAccess.client) return

    if (computed.streaming.error && state.config.autoRestart) {
      console.error('@@@restarting...')
      cls.streamingConnect()
    }
  }, [computed.streaming.error])

  /**
   * Percentage progress for seconds to start
   */

  const loadingContdown = useCountdown()

  React.useEffect(() => {

    if (computed.streaming.empty) {
      const sec = state.config.secondsToStart
      if (typeof sec === 'number' && sec > 0) {
        loadingContdown.start(sec)
      }
    }

    if (computed.streaming.initialized) {
      loadingContdown.stop()
    }

  }, [computed.streaming.initialized, state.config.secondsToStart])

  /**
   * Kill stream if secondsToKill > 0
   */
  useStreamKiller(dispatch, computed.streaming.active, state.config)

  /**
   * Streaming activation
   */

  React.useEffect(() => {

    if (computed.streaming.active) {

      // Show prompt befor exit
      unload.activate()

      // Apply current resolution
      resolution.resize()

    } else {
      unload.deactivate()
    }

  }, [computed.streaming.active])


  /**
   * Init build if ready
   */
  React.useEffect(() => {
    if (system.cls.streamingUrl) {
      cls.initPlayer(system.cls.streamingUrl)
    }
  }, [system.cls.streamingUrl])


  /**
   * Update build config
   * $sessionData — prevent init twice
   */
  const { sessionData } = system.state
  React.useEffect(() => {
    if (sessionData) {
      const { secondsToStart } = system.cls.sessionData
      if (typeof secondsToStart === 'number' && secondsToStart > 0 && !state.secondsToStart) {
        dispatch.updateConfig({ secondsToStart })
      }
    }
  }, [sessionData])

  /**
   * Wrapper for Client
   */

  const cls = new class {
    initReady: boolean

    constructor() {
      this.initReady = initReady
    }

    // useful info
    get info() {
      return {
        loading: loadingContdown,
      }
    }

    // useful methods
    get methods() {
      return {
        commands: {
          clear: () => dispatch.update({ commands_list: [] })
        },
        callbacks: {
          clear: () => dispatch.update({ callbacks_list: [] })
        },
      }
    }

    /**
     * Allow command if RTCPlayer exist and connection is active
     */
    _allowCommand(command: string) {
      if (!ClientAccess.client || !computed.streaming.active) {
        console.error('@@@error, streaming not active', { command })
        return
      }
      return true
    }

    /**
     * Emit system command
     */
    emitCommandSystem(command: string, value: any) {
      if (!this._allowCommand(command)) return
      ClientAccess.emitCommandSystem(command, value)
    }

    /**
     * Check callbacks_list and mark command item 
     * as confirmed if callback found by verification_id
     */
    async emitAsyncCommand(command: string, value: any) {
      if (!this._allowCommand(command)) return

      const emitItem: any = ClientAccess.emitCommand(command, value);

      const ms = 100
      const attempts = 5 * (ms / 10)

      for (let i = 0; i < attempts; i++) {
        await new Promise(r => setTimeout(r, ms, i))

        for (let item of window.callbacks_list || []) {
          if (item?.verification_id === emitItem?.verification_id) {
            return item
          }
        }
      }
    }

    /**
     * Emit command via portal commands (by uuid)
     */
    async emitUuidAsync(uuid: string) {
      for (let item of system.cls.commands_project) {
        if (item.command_uuid === uuid) {
          return await this.emitAsyncCommand(item.command, item.value)
        }
      }
      return false
    }


    /**
     * One time config initialization
     */
    initConfig(config: any, psConfig: any, ueSettings: any) {
      dispatch.updateConfig(config)
      dispatch.updatePsConfig(psConfig)
      dispatch.updateUeSettingsOnStart(ueSettings)

      // Delay for saving configs
      clearTimeout(refTimeoutConfig.current)
      refTimeoutConfig.current = setTimeout(() => {
        setInitReady(true)
      }, 300)
    }

    // Handle player initialization
    initPlayer(streamingUrl: string) {

      if (!streamingUrl) {
        console.error('Missing data:', { streamingUrl })
        return
      }

      // Send status handler for webrtc state changing
      dispatch.updateConfig({ streamingUrl })
      dispatch.updateWebrtcData({
        status: 'initializing',
      })

      // Init client once
      new ClientClass(streamingUrl, state.psConfig).init()

    }

    streamingConnect() {
      ClientAccess.connect()
    }

    streamingStop() {
      ClientAccess.close()
    }

    switchStart() {
      computed.streaming.active ? this.streamingStop() : this.streamingConnect()
    }

    clientCb(cb: Function) {
      const client = ClientAccess.client
      if (client) cb(client)
    }

    changeVolume(volume: number = 1) {

      this.clientCb((cl: any) => {
        if (!cl.videoPlayerController.audioElement) {
          cl.videoPlayerController.PlayAudioTrack()
          volume = 1
        } else {

          if (volume > 0) {
            cl.videoPlayerController.audioElement.play()
          } else if (volume === 0) {
            cl.videoPlayerController.audioElement.pause()
          }

          cl.videoPlayerController.audioElement.volume = volume
        }
      })

      // this.emitCommandSystem('user_sound', { volume })
      dispatch.updatePlayerSettings({ volume })
    }

  }

  return {
    state,
    cls,
    computed,
    dispatch,
  }
};

