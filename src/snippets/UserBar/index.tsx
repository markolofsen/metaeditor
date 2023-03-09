
// context
import { useGlobalContext } from "src/@core/context";

// mui
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';

// libs
import { Context, Hooks } from "pixel-streaming";

// icons
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';


const ToolsList = styled('ul')(({ theme }: any) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,

  position: 'fixed',
  right: '1rem',

  display: 'flex',
  flexDirection: 'column',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  '& > li': {
    padding: 5,
    '& > button': {
      borderRadius: theme.shape.borderRadius / 1.5,
    },
    ':not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    }
  }
}));


export default function UserBar() {

  // context
  const globalContext = useGlobalContext()
  const stream = Context.stream()

  const fullescreen = globalContext.fullescreenHandle

  // hooks
  const actions = Hooks.actions()

  // render
  const isMuted = stream.state.playerConfig?.psConfig.startMuted

  return (
    <ToolsList sx={{
      top: fullescreen.active ? '1rem' : '3rem',
    }}>
      <li>
        <IconButton
          sx={{ cursor: 'pointer' }}
          color="inherit"
          onClick={() => {
            fullescreen.active ? fullescreen.exit() : fullescreen.enter()
          }}>
          {fullescreen.active ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </li>
      <li>
        <IconButton
          onClick={() => {
            actions.switchMuted()
          }}
          sx={{ cursor: 'pointer' }}
          color="inherit">
          {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
        </IconButton>
      </li>
    </ToolsList>

  )
}