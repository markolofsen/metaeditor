
// mui
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

// icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// context
import { useStreamContext } from "src/@core/context"

// hooks
import useStreamActions from 'src/@core/hooks/useStreamActions'


export default function Preloader() {
  // hooks
  const streamContext = useStreamContext()
  const streamActions = useStreamActions()

  // render
  if (streamContext.state.streamStatus === 'play') return null

  const showPlayButton = streamContext.state.webrtcStatus == 'connected'

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all'
      }
    }}>
      {showPlayButton ? (
        <div onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          streamActions.play()
        }}>
          <IconButton color="inherit">
            <PlayArrowIcon
              style={{ fontSize: 120 }}
            />
          </IconButton>
        </div>

      ) : (
        <CircularProgress color='inherit' size={70} />
      )}

    </Box>

  )
}