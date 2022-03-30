import * as React from 'react';
import PropTypes from 'prop-types';

// hooks
import { useStorage, useParseUrl } from '../common/hooks/'

// context
import { useConnection } from '../context/';

// material
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// components
import CustomDialog from '../components/Dialog/'
import MailchimpForm from '../components/MailchimpForm/'

// snippets
import PreloaderProgress from './Preloader/Progress'


function CustomizedDialogs(props) {
  const connection = useConnection()
  const parseUrl = useParseUrl()
  const refDialog = React.useRef(null)

  const storage = useStorage()
  const storageKey = MailchimpForm.storageKey

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {

    if (parseUrl.active && !parseUrl.query?.mode) {
      if (!mounted && connection.state.auto_connect === true) {
        handleOpen()
        setMounted(true)
      }
    }

  }, [parseUrl.active])

  const handleOpen = () => {

    const stored_data = storage.getItem(storageKey, 'local')
    if (typeof stored_data !== 'object') {
      setTimeout(() => {
        refDialog.current.open()
      }, 1000 * 5)
    }
  }

  const handleClose = () => {
    refDialog.current.close()
  }

  const renderContet = () => {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 4 }}>

          <Typography variant="h5">
            Right now, MetaEditor is running a streaming server with Unreal Engine.
          </Typography>

          <Box sx={{ my: 3 }}>
            <PreloaderProgress />
          </Box>

          <Typography variant="body1" sx={{ mb: 1 }}>
            This is a demo version, and in production, the launch takes a couple of seconds.
          </Typography>

        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
          Enter your details
        </Typography>


        <MailchimpForm
          config={props.config}
          onSuccess={() => {
            handleClose()
          }}
          onError={err => {
            console.error(err)
            handleClose()
          }} />

      </Box>
    )
  }

  return (
    <CustomDialog
      ref={refDialog}
      title="Welcome!"
      subtitle={undefined}
      defaultOpen={false}
      closeIcon
      showActions={false}
      disableEscape
    >
      {renderContet()}
    </CustomDialog>
  );
}


CustomizedDialogs.propTypes = {
  config: PropTypes.exact({
    url: PropTypes.string.isRequired,
    customFields: PropTypes.object.isRequired,
  }).isRequired,
};


export default CustomizedDialogs
