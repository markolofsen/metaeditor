import React from "react"

// common
import CompareVersions from './CompareVersions'

// hooks
import { useNotify } from "../../common/hooks";
import { useApi } from "../../@core/hooks";

// material
import Button from '@mui/material/Button';

// package
import packageJson from '../../package.json'


const actions = () => {
  const api = useApi()
  const notify = useNotify()

  const [state, setState] = React.useState({
    metaeditor: null,
  });

  const dispatch = (payload) => setState(c => ({ ...c, ...payload }))

  React.useEffect(() => {

    // Preload data from api
    loadInfoData()

  }, [])


  React.useEffect(() => cls.checkUpdates(), [state.metaeditor])

  const loadInfoData = async () => {
    if (state.metaeditor) return

    const metaeditor = await api.getMetaeditorData()

    if (metaeditor) {
      dispatch({ metaeditor })
    }
  }

  const cls = new class {

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

  return {
    state,
    cls,
  }
};

export default actions
