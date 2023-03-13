
// context
import { useGlobalContext } from "src/@core/context";

// mui
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Portal from '@mui/material/Portal';

// libs
import { Context, Hooks } from "pixel-streaming";

// icons
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const ToolsList = styled('ul')(({ theme }: any) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,

  position: 'fixed',
  top: '1rem',
  right: '1rem',

  display: 'flex',
  flexDirection: 'column',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  '& > li': {
    padding: 5,
    '& > button': {
      cursor: 'pointer',
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
  const show = stream.isWebrtcConnected

  const list = [
    {
      title: fullescreen.active ? 'Fullscreen' : 'Exit',
      icon: fullescreen.active ? <FullscreenExitIcon /> : <FullscreenIcon />,
      onClick: () => {
        fullescreen.active ? fullescreen.exit() : fullescreen.enter()
      },
    },
    {
      title: isMuted ? 'Unmute' : 'Mute',
      icon: isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />,
      onClick: () => {
        actions.switchMuted()
      },
    },
    {
      title: stream.isStreamActive ? 'Pause' : 'Play',
      icon: stream.isStreamActive ? <PauseIcon /> : <PlayArrowIcon />,
      onClick: () => {
        stream.isStreamActive ? actions.disconnect() : actions.play()
      },
    },
  ]

  if (!show) return null

  return (
    <Portal container={window.player?.rootElement}>
      <ToolsList>
        {list.map((item, index) => (
          <li key={index}>
            <Tooltip title={item.title} placement="left">
              <IconButton
                onClick={item.onClick}
                color="inherit">
                {item.icon}
              </IconButton>
            </Tooltip>
          </li>
        ))}
      </ToolsList>
    </Portal>
  )
}