import * as React from 'react';

// context
import { usePlayer } from 'metaeditor/context/';

// hooks
import { useMedia } from 'metaeditor/common/hooks/'

// material
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiChip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Portal from '@mui/material/Portal';

// styles
import { styled } from 'metaeditor/common/styles/'

// components
import Button from './components/Button';


const RootDiv = styled.div(theme => ({
  background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3, 0, 10),
  opacity: .4,
  transition: theme.transitions.create(['opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  '&:hover': {
    opacity: 1,
  },

}))

const ContentDiv = styled.div(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'all',
}))

const Chip = styled.custom(MuiChip, theme => ({
  borderColor: `rgba(255,255,255, .2)`,
  pointerEvents: 'all',
}))


function DesktopVersion() {
  return (
    <Portal>
      <RootDiv>

        <ContentDiv>
          <Typography variant="h6" sx={{ mr: 3, cursor: 'default' }}>
            Quick view:
          </Typography>

          <Stack direction="row" spacing={1}>
            {menuList.map((item, index) => (
              <Chip
                key={index}
                label={item.label}
                variant="outlined"
                color="default"
                onClick={() => { }} />
            ))}
          </Stack>

        </ContentDiv>

      </RootDiv>
    </Portal>
  )
}


function MobileVersion() {
  const player = usePlayer()
  const isDisabled = !player.state.loaded || !player.state.body_clicked

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
        tooltip="Quick navigation">
        <Icon>keyboard_double_arrow_down</Icon>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuList.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default function QuickNavigation() {
  const media = useMedia()

  return (
    <div>
      {media.down.lg ? (
        <MobileVersion />
      ) : (
        <DesktopVersion />
      )}
    </div>
  )
}

const menuList = [
  ['Intro'],
  ['Exterior'],
  ['Side View'],
  ['Front View'],
  ['Wheels'],
  ['Back View'],
  ['Driver'],
  ['Passenger'],
  ['Interior'],
].map(([label]) => ({ label }))