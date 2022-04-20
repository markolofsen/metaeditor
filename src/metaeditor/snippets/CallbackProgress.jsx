import * as React from 'react';

// // context
// import { usePlayer } from '../context/';

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

function CallbackProgress(props) {
  // const player = usePlayer()
  const refInteval = React.useRef(null)

  const [progress, setProgress] = React.useState(-1);
  // const playerLoaded = player.state.loaded

  React.useEffect(() => {
    return () => {
      clearInterval(refInteval.current);
    };
  }, []);

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    start: (payload) => {
      handleOpen(payload)
    },
    stop: () => {
      clearInterval(refInteval.current);
      setProgress(100)

      // hide progress when progress drawed
      setTimeout(() => setProgress(-1), 500)
    },
  }));

  const handleOpen = (payload) => {
    if (['console_command'].includes(payload?.type)) return;

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


export default React.forwardRef((props, ref) => (
  <CallbackProgress {...props} innerRef={ref} />
))