import React from 'react'

// styles
import { styled } from 'metalib/styles/'

// context
import { useSystem } from '../../../../context/'

// material
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from '@mui/material/Icon';

// components
import CustomDialog from '../../../../components/Dialog/'



const StepsList = styled.ul(theme => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  '& > li': {
    ...theme.typography.body1,
    display: 'flex',
    alignItems: 'center',
    '& > label': {
      ...theme.typography.h6,
      marginRight: theme.spacing(2),
    }
  }
}))


function ButtonConnect() {
  const system = useSystem()
  const refDialog = React.useRef(null)

  const [value, setValue] = React.useState(system.clsApi.apiKey);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    refDialog.current.open()
  }

  const onSubmitForm = (event) => {
    event.stopPropagation()
    event.preventDefault()

    // 22ce8c14-7888-4b72-8e45-ab696ea47d06
    system.clsApi.setApiKey(value)
    refDialog.current.close()
  }

  const error = system.state.metaeditor?.project?.error
  const isConnectionError = error && system.clsApi.apiKey
  const isConnected = error === false

  const renderButton = () => {

    if (isConnectionError) {
      return (
        <Button onClick={handleOpen}>
          Reconnect project
        </Button>
      )
    }

    if (isConnected) {
      return (
        <Button onClick={handleOpen}>
          Connected!
        </Button>
      )
    }

    return (
      <Button onClick={handleOpen}>
        Connect project
      </Button>
    )

  }

  const renderDialogContent = () => {
    const portalUrl = system.state.metaeditor?.portal?.url

    return (
      <div>

        <Paper sx={{ mb: 6, p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            How to get an API key
          </Typography>
          <StepsList>
            <li>
              <label>1.</label>
              Go to <MuiLink sx={{ ml: 1 }} href={portalUrl} target="_blank">Streaming Portal</MuiLink>
            </li>
            <li>
              <label>2.</label>
              Create a project
            </li>
            <li>
              <label>3.</label>
              Copy the API key specified in the project properties
            </li>
          </StepsList>
        </Paper>

        <form onSubmit={onSubmitForm}>
          <TextField
            required
            fullWidth
            label="Enter API KEY"
            value={value}
            onChange={handleChange}
          />
          <Button sx={{ mt: 2 }} type="submit" size="large" color="primary" variant="contained" fullWidth>
            Done!
          </Button>
        </form>

      </div>
    )
  }

  return (
    <div>

      <CustomDialog
        ref={refDialog}
        title="Project connection"
        subtitle={undefined}
        defaultOpen={false}
        closeIcon={true}
        showActions={false}
      >
        {renderDialogContent()}
      </CustomDialog>

      <ButtonGroup fullWidth variant='contained' color={isConnectionError ? 'error' : isConnected ? 'success' : 'primary'} >
        {renderButton()}
        <Button sx={{ minWidth: 0, width: 50 }}
          onClick={() => {
            if (!confirm('Refresh commands?')) return
            system.clsApi.refreshData()
          }}>
          <Icon>refresh</Icon>
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default ButtonConnect