import * as React from 'react';

// hooks
import { useHotkeys } from 'metalib/common/hooks/'

// context
import { useConnection, useSystem } from '../../context/';

// styles
import { styled } from 'metalib/styles/'

// material
import Box from '@mui/material/Box';

// components
import SystemDialog from './components/SystemDialog'

// blocks
import AppBar from './AppBar';
import StateData from './StateData'
import StateConnection from './StateConnection/'
import DebugForm from './DebugForm'
import LogsData from './LogsData/'
import CommandsList from './CommandsList/'

// actions
import FullscreenButton from './Actions/FullscreenButton/'
import VolumeButton from './Actions/VolumeButton'


const PanelDiv = styled.custom(Box, theme => ({
  position: 'absolute',
  zIndex: theme.zIndex.appBar + 1,
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}))

function DevBar(props) {
  useSystem()

  const connection = useConnection()

  const refSystemDialog = React.useRef(null)

  const [show, setShow] = React.useState(true)
  const [currentMenu, setCurrentMenu] = React.useState(false)

  // Test panel
  // React.useEffect(() => {
  //   setCurrentMenu('commands')
  //   refSystemDialog.current?.open()
  // }, [])

  useHotkeys('ctrl+r', async (e, ke) => {
    if (!e.repeat) {
      if (confirm('Do you want to restart the streaming server?')) {
        await connection.onRestartStream()
      }
      return;
    }
  }, [])

  useHotkeys('ctrl+z', (e, ke) => {
    if (!e.repeat) {
      setShow(c => {
        // const res = !c
        // setCurrentMenu(false)
        return !c;
      })
      return;
    }
  }, [show])

  const renderDialog = () => {

    const list = [
      ['state', 'State', <StateData />, 400],
      ['connection', 'Connection', <StateConnection />, 400],
      ['debug', 'Debug', <DebugForm />, 400],
      ['logs', 'Pixel Streaming logs', <LogsData />, 600],
      ['commands', 'Commands', <CommandsList />, 500],
    ].map(([key, title, children, width]) => ({ key, title, children, width }))

    let obj = {
      key: '',
      title: '',
      children: '',
      width: '',
    }

    for (let item of list) {
      if (item.key === currentMenu) {
        obj = item
      }
    }


    return (
      <SystemDialog
        ref={refSystemDialog}
        title={obj.title}
        width={obj.width}
        onClose={() => {
          setCurrentMenu(false)
        }}>
        {obj.children}
      </SystemDialog>
    )
  }

  const handleMenu = (name) => {
    setCurrentMenu(name)
    refSystemDialog.current?.open()
  }

  if (!show) {
    return <div />
  }

  return (
    <PanelDiv>

      <div>
        <Box style={{ display: 'flex', pointerEvents: 'all' }}>
          {renderDialog()}
          <AppBar handleMenu={handleMenu} />
          <Box sx={{ ml: .5, display: 'flex', gap: theme => theme.spacing(.5) }}>
            <FullscreenButton />
            <VolumeButton />
            <div id="metaeditor-toolbar-left" />
          </Box>
        </Box>
      </div>

      <div>
        <Box
          id="metaeditor-toolbar-right"
          style={{ pointerEvents: 'all' }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: theme => theme.spacing(2),
          }} />
      </div>

    </PanelDiv>
  )
};


export default DevBar;
