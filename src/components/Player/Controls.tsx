// mui
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// libs
import { Hooks } from 'pixel-streaming';


export default function Controls() {
  const actions = Hooks.actions()

  return (
    <ButtonGroup>
      <Button variant='contained' onClick={() => {
        actions.emitUi({ action: 'ui_command' }, { debug: true })
      }}>
        Send action
      </Button>
      <Button variant='contained' onClick={() => {
        actions.emitSys({ action: 'system_command' }, { debug: true })
      }}>
        Send command
      </Button>
    </ButtonGroup>
  )
}