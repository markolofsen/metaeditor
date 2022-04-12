import * as React from 'react';

// hooks
import { useStorage } from '../../../common/hooks/'

// context
import { usePlayer, useConnection } from '../../../context/';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// components
import CustomDialog from '../../../components/Dialog/'


const STORAGE_KEY = 'DEV_SERVER_DATA'


function ConnectionForm(props) {
  const player = usePlayer()
  const connection = useConnection()

  const refDialog = React.useRef(null)
  const storage = useStorage()

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    open: () => {
      refDialog.current.open()
    }
  }));


  React.useEffect(() => {
    if (connection.state.auto_connect === false) {
      openOnStart()
    }
  }, [connection.state.auto_connect])

  const openOnStart = () => {

    refDialog.current.open()

    // Restore local server data
    const stored_data = storage.getItem(STORAGE_KEY)
    if (stored_data) {
      const payload = {
        host: stored_data?.host,
        port: stored_data?.port,
      }

      if (payload.host && payload.port) {
        connection.manualConnection(payload)
      }
    }

  }

  React.useEffect(() => {

    if (!connection.state.auto_connect) {
      storage.setItem(STORAGE_KEY, connection.state)
    }

  }, [connection.state])

  // Close dialog
  React.useEffect(() => {

    if (!connection.state.auto_connect) {
      if (player.state.loaded) {
        refDialog.current.close()
      }
    }

  }, [player.state.loaded])


  const handleInput = key => event => {
    const value = event.target.value
    connection.handleConnection({ [key]: value })
  }

  const setDefault = () => {
    return (
      <a href="#" onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        connection.handleConnection({
          host: 'http://127.0.0.1',
          port: 80,
        })
      }}>
        Set default: http://127.0.0.1:80
      </a>
    );
  }

  const renderForm = () => {

    const is_disabled = player.state.connected

    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()

        // initConnection()
        connection.initConnection()
      }}>

        <Box sx={{ flexGrow: 1, pt: 2, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>

              <TextField
                disabled={is_disabled}
                autoFocus
                fullWidth
                label="Host"
                type="url"
                placeholder="http://127.0.0.1"
                value={connection.state.host}
                onChange={handleInput('host')}
                helperText={setDefault()}
              />

            </Grid>
            <Grid item xs={4}>

              <TextField
                disabled={is_disabled}
                fullWidth
                label="Port"
                type="number"
                placeholder="80"
                value={connection.state.port}
                onChange={handleInput('port')} />

            </Grid>
          </Grid>
        </Box>

        <Button
          disabled={is_disabled}
          fullWidth
          type="submit"
          size="large"
          variant="contained">
          Connect
        </Button>

      </form>
    )
  }

  return (
    <div>
      <CustomDialog
        ref={refDialog}
        title="Development: Connection form"
        subtitle="Run STUN and TURN Servers and a project with Unreal Engine."
        closeIcon
        showActions={false}
        disableEscape={false}
      >
        <div>

          <div>
            Documentation: <a href="https://metaeditor.io/docs/dev/localhost" target="_blank">Connection to localhost</a>
          </div>

          {renderForm()}
        </div>
      </CustomDialog>
    </div>
  )
}


export default React.forwardRef((props, ref) => (
  <ConnectionForm {...props} innerRef={ref} />
))
