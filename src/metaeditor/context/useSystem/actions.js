import React from "react"

// reducers
import reducer from './reducer'

// common
import { MetaData } from '../../libs/'

// hooks
import { useNotify } from "../../common/hooks";

// material
import Button from '@mui/material/Button';


const actions = () => {
  const notify = useNotify()

  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);

  const dispatch = (payload) => dispatch_({
    type: reducer.KEY.UPDATE,
    payload,
  })

  React.useEffect(() => {

    cls.checkUpdates()

  }, [])

  const cls = new class {

    updatesNotification() {
      console.error('state', state)
      notify.warning(JSON.stringify(state.versionsData), { key: undefined })
    }

    async checkUpdates() {
      if (state.versionsData) return
      const versionsData = await MetaData.checkUpdates()
      dispatch({ versionsData })

      const getContent = () => {
        return (
          <div>
            <Button sx={{ mb: 1 }} color="inherit" variant="outlined" size="small" onClick={() => {
              window.open(versionsData.readmeUrl)
              notify.closeByKey('upgrade')
            }}>Upgrade MetaEditor</Button>
            <div>
              <small>From v{versionsData.current} to v.{versionsData.release}</small>
            </div>
          </div>
        )
      }

      if (versionsData.status < 0) {
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
