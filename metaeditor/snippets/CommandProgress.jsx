import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'


// material
import MuiLinearProgress from '@mui/material/LinearProgress';
import MuiBox from '@mui/material/Box';



const Box = styled.custom(MuiBox, theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  zIndex: theme.zIndex.modal + 1,
}))

const LinearProgress = styled.custom(MuiLinearProgress, theme => ({
  // backgroundColor: 'rgba(255,255,255, .1)',
}))

export default function useCommandLoader() {
  // const player = usePlayer()
  const refInteval = React.useRef(null)

  const [progress, setProgress] = React.useState(-1);
  // const playerLoaded = player.state.loaded

  React.useEffect(() => {

    document.addEventListener('metaeditor_command', handleStart)
    document.addEventListener('metaeditor_callback', handleStop)

    return () => {

      document.removeEventListener('metaeditor_command', handleStart)
      document.removeEventListener('metaeditor_callback', handleStop)

      clearInterval(refInteval.current);
    };
  }, []);

  const handleStop = () => {
    clearInterval(refInteval.current);
    setProgress(100)

    // hide progress when progress drawed
    setTimeout(() => setProgress(-1), 500)

  }

  const handleStart = () => {

    clearInterval(refInteval.current);
    setProgress(0)

    refInteval.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(refInteval.current);
          return -1;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };

  if (progress === -1) {
    return (<div />);
  }

  return (
    <Box>
      <LinearProgress variant="determinate" color="inherit" value={progress} />
    </Box>
  );
}
