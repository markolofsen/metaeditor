import * as React from 'react';

// context
import { usePlayer } from 'metaeditor/context/';

// material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function CallbacksDemo() {
  const player = usePlayer()
  const [disabled, setDisabled] = React.useState(false)

  const onCommand = (detail) => {
    if (detail.command === 'test_command') {
      alert('Command\n' + JSON.stringify(detail))
    }
  }

  const onCallback = (detail) => {
    if (detail.command === 'test_command') {
      alert('Callback\n' + JSON.stringify(detail))
    }
  }

  player.cls.useTrigger({ onCommand, onCallback })

  const testCommand = async () => {
    setDisabled(true)
    await player.cls.emitAsync({
      command: 'test_command',
      request: {
        // The request body should only contain a json object.
        body: { volume: 1 },
      },

      // If the callback emulation option is enabled, then the contents of fakeResponse will be returned as response.body
      fakeResponse: undefined,
    }).then(res => {
      if (res) {
        alert('Callback received!')
        console.log(res)
      }
    })
    setDisabled(false)
  }

  if (!player.state.active) {
    return (<div />)
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button variant="outlined" color="inherit" disabled={disabled} onClick={testCommand}>
        Test command
      </Button>
    </Box>
  )
}