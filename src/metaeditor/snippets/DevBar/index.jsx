import * as React from 'react';

// hooks
import { useHotkeys } from '../../common/hooks/'

// context
import { useConnection, useSystem } from '../../context/';

// styles
import { styled } from '../../common/styles/'

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



const RootDiv = styled.ul(theme => ({
  position: 'absolute',
  zIndex: theme.zIndex.appBar + 1,
  top: theme.spacing(2),
  left: theme.spacing(2),
  pointerEvents: 'all',
  display: 'flex',
  // width: 'max-content',

  // [theme.breakpoints.down('sm')]: {
  //   right: theme.spacing(2),
  // },
}))

function DevBar(props) {
  useSystem()

  const connection = useConnection()

  const refSystemDialog = React.useRef(null)

  const [show, setShow] = React.useState(true)
  const [currentMenu, setCurrentMenu] = React.useState(false)

  // Test opening panel
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

  const renderDevBar = () => {
    if (!show) return;

    return (
      <Box sx={{ mr: 1 }}>

        {renderDialog()}

        <AppBar handleMenu={handleMenu} />

      </Box>
    )
  }

  return (
    <RootDiv>
      {renderDevBar()}
      <div id="metaeditor-toolbar" />
    </RootDiv>
  )
};


export default DevBar;
