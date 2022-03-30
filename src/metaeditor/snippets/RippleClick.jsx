import React from "react";

// context
import { usePlayer } from '../context/';

// styles
import { makeStyles } from '../common/styles/'


const useStyles = makeStyles((theme) => ({

  '@global': {
    '@keyframes click_ripple': {
      from: {
        opacity: 1,
        // borderWidth: 1,
      },
      to: {
        transform: 'scale(10)',
        opacity: 0,
      },
    },
  },

  wave: {
    pointerEvents: 'none',
    position: 'absolute',
    animation: 'click_ripple .5s linear forwards',
    borderRadius: '50%',
    width: 4,
    height: 4,
    marginLeft: -2,
    marginTop: -2,
    backgroundColor: 'rgba(255,255,255, 1)',
  },

}))


function RippleClick(props) {
  const player = usePlayer()
  const classes = useStyles();

  const refClick = React.useRef(null)

  const [show, setShow] = React.useState(false)
  const [position, setPosition] = React.useState({ pageX: 0, pageY: 0 })

  const playerLoaded = player.state.loaded

  const onRippleStart = React.useCallback((event) => {
    if (event.which !== 1) return;
    if (event.target.id !== 'streamingVideo') return;

    const { pageX, pageY } = event

    setPosition({ pageX, pageY })
    setShow(true)

    clearTimeout(refClick.current)
    refClick.current = setTimeout(() => setShow(false), 500)
  }, []);


  const addListener = () => {
    window.addEventListener('mousedown', onRippleStart)
  }

  const removeListener = () => {
    clearTimeout(refClick.current)
    window.removeEventListener('mousedown', onRippleStart)
  }

  React.useEffect(() => {
    return () => {
      removeListener()
    };
  }, [])

  React.useEffect(() => {
    if (playerLoaded) {
      addListener()
    } else {
      removeListener()
    }
  }, [playerLoaded])


  return (
    <div>
      {show && (
        <div className={classes.wave} style={{
          top: position.pageY,
          left: position.pageX,
        }} />
      )}
    </div>
  );
}

export default RippleClick
