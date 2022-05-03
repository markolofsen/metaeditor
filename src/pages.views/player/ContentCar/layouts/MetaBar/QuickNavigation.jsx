import * as React from 'react';

// context
import { usePlayer } from 'metaeditor/context/';

// hooks
import { useMedia } from 'metalib/common/hooks/'

// material
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiChip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Portal from '@mui/material/Portal';

// styles
import { styled } from 'metalib/styles/'

// components
import Button from 'metaeditor/snippets/DevBar/Actions/Button';

// commands
import useBridge from '../../useBridge'


const RootDiv = styled.div(theme => ({
  pointerEvents: 'none',
  background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(4),
  '&[data-hover="true"]': {
    '& > [data-shadow]': {
      opacity: 1,
    },
  },
  '& > [data-shadow]': {
    background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    opacity: .5,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }

}))

const ContentDiv = styled.div(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'all',
  zIndex: 1,
}))

const Chip = styled.custom(MuiChip, theme => ({
  border: 0,
  backgroundColor: 'rgba(0,0,0,.3)',
  pointerEvents: 'all',
  height: 'auto',
  '& > .MuiChip-label': {
    padding: theme.spacing(.7, 1.5),
  }
}))



function DesktopVersion({ items }) {
  const [hover, setHover] = React.useState(false)

  const handleHover = v => event => {
    setHover(v)
  }

  return (
    <Portal>
      <RootDiv
        onMouseOver={handleHover(true)}
        onMouseOut={handleHover(false)}
        data-hover={hover}>

        <div data-shadow />

        <ContentDiv>
          <Typography variant="body2 " sx={{ mr: 2, cursor: 'default', fontWeight: theme => theme.typography.fontWeightMedium }}>
            Quick view:
          </Typography>

          <Stack direction="row" spacing={1}>
            {items.map((item, index) => (
              <Chip
                key={index}
                label={item.name}
                variant="outlined"
                color="default"
                onClick={() => item.cmd.onClick()} />
            ))}
          </Stack>

        </ContentDiv>

      </RootDiv>
    </Portal>
  )
}


function MobileVersion({ items }) {
  const player = usePlayer()
  // const isDisabled = !player.state.loaded || !player.state.body_clicked

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        // disabled={isDisabled}
        tooltip="Quick view">
        <Icon>search</Icon>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={() => {
            item.cmd.onClick()
            handleClose()
          }}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default function QuickNavigation() {
  const media = useMedia()
  const bridge = useBridge()

  const c = bridge.views
  const items = [
    {
      name: 'Intro',
      cmd: c.default,
    },
    {
      name: 'Front View',
      cmd: c.front_view,
    },
    {
      name: 'Side view',
      cmd: c.side_view,
    },
    {
      name: 'Back view',
      cmd: c.back_view,
    },
    {
      name: 'Wheels',
      cmd: c.wheels,
    },
    {
      name: 'Interior',
      cmd: c.seats,
    },
    {
      name: 'Driver',
      cmd: c.trim,
    },
    {
      name: 'Passenger',
      cmd: c.passenger,
    },
  ]

  return (
    <div>
      {media.down.lg ? (
        <MobileVersion items={items} />
      ) : (
        <DesktopVersion items={items} />
      )}
    </div>
  )
}
