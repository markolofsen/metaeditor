import * as React from 'react';

// mui
import { styled } from '@mui/system';
import ClickAwayListener from '@mui/base/ClickAwayListener';

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


export default function Controls() {

  // hooks
  const media = useMedia()

  // states
  const [show, setShow] = React.useState(true)

  return (
    <ClickAwayListener

      onClickAway={() => {
        if (media.down.sm) {
          setShow(false)
        }
      }}>

      <RootDiv
        onMouseEnter={() => {
          setShow(true)
        }}
        onTouchStart={() => {
          setShow(true)
        }}
        sx={{
          opacity: show ? 1 : .5
        }}>
        <li data-li="menu">
          <MainMenu />
        </li>
        <li data-li="gallery">
          <Gallery />
        </li>
      </RootDiv>
    </ClickAwayListener>
  )
}