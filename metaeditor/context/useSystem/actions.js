import React from "react"

// common
import CompareVersions from './CompareVersions'

// hooks
import { useApi } from "../../@common/hooks";
import { useNotify } from "../../@common/hooks/";
import { useStorage } from "metalib/common/hooks";

// context
import { usePlayer } from "../usePlayer";

// material
import Button from '@mui/material/Button';

// package
import packageJson from '../../package.json'



const actions = () => {
  const player = usePlayer()
  const api = useApi()
  const notify = useNotify()
  const storage = useStorage()

  const [state, setState] = React.useState({
    metaeditor: null,
  });

  const dispatch = (payload) => setState(c => ({ ...c, ...payload }))


  React.useEffect(() => cls.checkUpdates(), [state.metaeditor])


  React.useEffect(() => {

    // Preload data from api
    if (!state.state) {
      cls.loadData()
    }

  }, [])


  const cls = new class {

    async loadData() {
      await api.getMetaeditorData(clsApi.apiKey).then(res => {
        if (res.ok) {
          dispatch({ metaeditor: res.body })
        }
      })
    }

    async checkUpdates() {
      const metaeditor = state.metaeditor
      if (!metaeditor) return
      const getContent = () => {
        return (
          <div>
            <Button sx={{ mb: 1 }} color="inherit" variant="outlined" size="small" onClick={() => {
              window.open(metaeditor.package.readmeUrl)
              notify.closeByKey('upgrade')
            }}>Upgrade MetaEditor</Button>
            <div>
              <small>From v{packageJson.version} to v.{metaeditor.package.version}</small>
            </div>
          </div>
        )
      }

      const { current, release, status } = CompareVersions(packageJson.version, metaeditor.package.version)

      if (status < 0) {
        setTimeout(() => {
          notify.info(getContent(), { key: 'upgrade', persist: true })
        }, 1000 * 2)
      }

    }

  }

  const clsApi = new class {

    constructor() {
      this.storageKey = 'metaeditor-project-api-key'
    }

    get apiKey() {
      const key = storage.getItem(this.storageKey, 'local')
      if (key) return key
      return undefined
    }

    setApiKey(key) {
      storage.setItem(this.storageKey, key, 'local')
      this.refreshData()
    }

    refreshData() {
      dispatch({ metaeditor: null })
      cls.loadData()
    }


    /**
     * Emit async commands from portal
     */
    async metaEmitAsync(command_uuid) {
      for (let item of state.metaeditor?.commands) {
        if (item.command_uuid === command_uuid) {

          return await player.cls.emitAsync({
            command: item.command,
            request: {
              body: item.value,
            },

            // If the callback emulation option is enabled, then the contents of fakeResponse will be returned as response.body
            fakeResponse: undefined,
          })

        }

      }
      return false
    }

  }

  return {
    state,
    cls,
    clsApi,
  }
};

export default actions
