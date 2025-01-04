import * as React from 'react';

// context
import { useGlobalContext } from 'src/@core/context';

// mui
import { styled } from '@mui/system';
import { Box, Collapse, Button } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// icons
import MenuIcon from '@mui/icons-material/Menu';

// hooks
import { useMedia } from 'src/@core/hooks/useMedia'

// blocks
import MainMenu from './MainMenu'
import Gallery from './Gallery'


const RootDiv = styled('ul')(({ theme }: any) => ({
  listStyle: 'none',
  margin: 0,
  padding: theme.spacing(3),

  backgroundColor: 'rgba(0,0,0,.5)',
  backdropFilter: 'blur(4px)',
  // borderRadius: theme.shape.borderRadius * 1.2,
  borderTop: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.down("md")]: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  [theme.breakpoints.up("md")]: {
    display: 'flex',
    // alignItems: 'center',
  },


  '& > [data-li="menu"]': {
    [theme.breakpoints.up("md")]: {
      flex: '1 0 40%',
      maxWidth: '40%',
    }
  },
  '& > [data-li="gallery"]': {
    flex: 1,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      flex: 1,
      marginLeft: '2rem',
    },
  }

}))

const IconButtonMenu = styled(Button)(({ theme }: any) => ({
  backgroundColor: 'rgba(0,0,0,.5)',
  backdropFilter: 'blur(4px)',
  borderRadius: theme.shape.borderRadius * 1.2,
  border: `1px solid ${theme.palette.divider}`,
}))

export default function Controls() {

  // context
  const globalContext = useGlobalContext()

  // hooks
  const media = useMedia()

  // states
  const [show, setShow] = React.useState(true)
  const [collapsed, setCollapsed] = React.useState(true)

  React.useEffect(() => {
    setShow(media.down.sm ? false : true)
  }, [media.down.sm])

  React.useEffect(() => {
    setCollapsed(false)
    setTimeout(() => {
      setCollapsed(true)
    }, 300)
  }, [globalContext.state.bottomMenuIndex])

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (media.down.sm) {
          setShow(false)
        }
      }}>
      <Box data-click={false}>
        {!show && (
          <Box sx={{
            padding: '1rem'
          }}>
            <IconButtonMenu
              data-click={true}
              size='large'
              color="inherit"
              startIcon={<MenuIcon />}
              onClick={() => {
                setShow(true)
              }}>
              Menu
            </IconButtonMenu>
          </Box>
        )}

        <Collapse in={show}>
          <RootDiv data-click={true}>
            <li data-li="menu">
              <MainMenu />
            </li>
            <li data-li="gallery">
              <Collapse in={collapsed}>
                <Box sx={{
                  borderRadius: theme => theme.shape.borderRadius + 'px',
                  border: '1px solid',
                  borderColor: 'divider',
                }}>
                  <Gallery />
                </Box>
              </Collapse>
            </li>
          </RootDiv>

        </Collapse>
      </Box>
    </ClickAwayListener>
  )
}