import * as React from 'react';

// mui
import { styled } from '@mui/system';
import { Box, Collapse, Button } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

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
  borderRadius: theme.shape.borderRadius * 1.2,
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up("md")]: {
    display: 'flex',
    alignItems: 'center',
  },

  '& > [data-li="menu"]': {
    [theme.breakpoints.up("md")]: {
      flex: '1 0 40%',
      maxWidth: '40%',
    }
  },
  '& > [data-li="gallery"]': {
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
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

  // hooks
  const media = useMedia()

  // states
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    setShow(media.down.sm ? false : true)
  }, [media.down.sm])

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (media.down.sm) {
          setShow(false)
        }
      }}>
      <Box sx={{
        padding: '1rem',
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'all',
        }
      }}>
        {!show && (
          <IconButtonMenu
            size='large'
            color="inherit"
            startIcon={<MenuIcon />}
            onClick={() => {
              setShow(true)
            }}>
            Menu
          </IconButtonMenu>
        )}

        <Collapse in={show}>
          <RootDiv>
            <li data-li="menu">
              <MainMenu />
            </li>
            <li data-li="gallery">
              <Gallery />
            </li>
          </RootDiv>

        </Collapse>
      </Box>
    </ClickAwayListener>
  )
}