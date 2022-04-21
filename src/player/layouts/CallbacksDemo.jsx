import * as React from 'react';

// context
import { usePlayer } from 'metaeditor/context/';

// material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function CallbacksDemo() {
  const player = usePlayer()
  const [disabled, setDisabled] = React.useState(false)
  const callbackUserSound = player.cls.callbacks.getLast('click_on_door')

  React.useEffect(() => {
    if (callbackUserSound) {
      alert('Independent callback')
    }
  }, [callbackUserSound])

  const testCommand = async () => {
    setDisabled(true)
    await player.cmd.emit({
      command: 'change_color',
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

  if (!player.cls.streamIsActive) {
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