import * as React from 'react'

// reducer
import { useDispatch } from "./useReducer";

// pixel-streaming
import { EventsClass as Ev } from '../../client/'

// hooks
import { useApi } from '../../hooks/useApi';
import { useEventListener } from '../../hooks/useEventListener';
import { useBuildConnector } from './hooks/useBuildConnector';
import { useStorageBook } from '../../hooks/useStorageBook';
import { useVersionCompare } from './hooks/useVersionCompare';
import { useNotifier } from './hooks/useNotifier'


export const useActions = () => {
  const [state, dispatch] = useDispatch()

  const api = useApi()
  const notifier = useNotifier()
  const storageBook = useStorageBook()
  const versionCompare = useVersionCompare()


  // Fetch streaming session by buildId
  const buildConnector = useBuildConnector(dispatch)


  // Notification settings
  useEventListener(Ev.commands.key, (payload: any) => {
    if (!notifications.showCommands) return
    notifier.pushCommand(notifications.placementValue, payload)
  });
  useEventListener(Ev.callbacks.key, (payload: any) => {
    if (!notifications.showCallbacks) return
    notifier.pushCallback(notifications.placementValue, payload)
  });

  /**
   * First initialization
   */
  React.useEffect(() => {

    // Load data by Api Key
    storageBook.apiKey.read((v: any) => {
      if (v) cls.loadData(v)
    })

  }, [])

  /**
   * loadData if apiKey applied
   */
  React.useEffect(() => {

    if (state.apiKey) {
      cls.loadData()
    }

  }, [state.apiKey])

  const cls = new class {

    initMetaConfig(payload: any) {
      dispatch.updateMetaConfig(payload)
    }

    setApiKey(apiKey: string) {
      dispatch.update({ apiKey })
    }

    get apiKeyIsCorrect() {
      return state.apiKey ? true : false
    }

    async loadData(apiKey: string | null = state.apiKey) {
      return await api.getMetaeditorData(apiKey).then(res => {
        if (res.ok) {
          const metaData = res.body
          dispatch.update({ metaData })
          storageBook.apiKey.save(apiKey)
          return true
        } else {
          dispatch.update({ apiKey: null })
          storageBook.apiKey.remove()
        }
        return false
      })
    }

    get commands_system() {
      const list = state.metaData?.commands_system
      if (!Array.isArray(list)) return []
      return list
    }

    get commands_project() {
      const list = state.metaData?.commands_project
      if (!Array.isArray(list)) return []
      return list
    }

    connectBuild(buildId: string) {
      dispatch.update({ buildId })
      buildConnector.start(buildId)
    }

    get streamingUrl() {
      if (this.sessionData) {
        return this.sessionData.streamingUrl
      }
      return false
    }

    get sharedUrl() {
      if (!this.sessionData) return false
      const sessionUuid: string = this.sessionData?.uuid
      const { protocol, host, pathname } = document.location
      return `${protocol}//${host}${pathname}?session=${sessionUuid}`
    }

    get sessionData() {

      if (state.sessionData) {
        const { stream_data, uuid } = state.sessionData

        return {
          uuid,
          streamingUrl: stream_data.host,
          status: stream_data.status,
          secondsToStart: stream_data.seconds_to_start,
          // secondsToKill: stream_data.seconds_to_kill,
        }
      }

      return false
    }

    get apiData() {
      if (state.sessionData) {
        const { error, module_version } = state.metaData?.api_data

        return {
          error,
          module: versionCompare(module_version),
        }
      }

      return false
    }
  }

  const project = new class {
    get exist() {
      return state.metaData ? true : false
    }

    get name() {
      return state.metaData?.project?.info?.name
    }

    get menu() {
      return state.metaData?.menu || []
    }

    get config() {
      return state.metaData?.project?.info?.config || false
    }
  }

  const config = new class {
    get showToolbar() {
      return state.metaConfig.showToolbar
    }
    get showQuickMenu() {
      return state.metaConfig.showQuickMenu
    }
    get showDevBar() {
      return state.metaConfig.showDevBar
    }
    get helpers() {
      return {
        keyboard: state.metaConfig.helpers.keyboard
      }
    }

    get showOverlay() {
      return state.metaConfig.showOverlay
    }
    get issuesUrl() {
      return state.metaConfig.issuesUrl
    }
    get videoUrl() {
      return state.sessionData?.metadata?.video_url || state.metaConfig.videoUrl
    }
  }

  const notifications = new class {
    get showCommands() {
      return state.metaConfig.notifications.showCommands
    }
    get showCallbacks() {
      return state.metaConfig.notifications.showCallbacks
    }
    get placementsList() {
      return [
        { label: 'topStart', value: 'topStart' },
        { label: 'topCenter', value: 'topCenter' },
        { label: 'topEnd', value: 'topEnd' },
        { label: 'bottomStart', value: 'bottomStart' },
        { label: 'bottomCenter', value: 'bottomCenter' },
        { label: 'bottomEnd', value: 'bottomEnd' }
      ]
    }
    get placementValue() {
      return state.metaConfig.notifications.placement
    }
    updatePlacement(placement: string) {
      dispatch.updateNotificationSettings({ placement })
    }
    updateCommands(showCommands: boolean) {
      dispatch.updateNotificationSettings({ showCommands })
    }
    updateCallbacks(showCallbacks: boolean) {
      dispatch.updateNotificationSettings({ showCallbacks })
    }
  }

  return {
    state,
    dispatch,
    cls,
    config,
    project,
    notifications,
  }
};

