import * as React from 'react'

// ui
import { jss, media } from "pixel-streaming"

// components
import { Gallery } from 'src/components/Gallery/'

const useStyles = jss({
  root: {
    height: '100vh'
  },
  popover: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    '& > div': {
      pointerEvents: 'all',
      backgroundColor: 'black',
      color: '#fff',
      padding: 40,
      borderRadius: 30,
    }
  }
})

const View: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        Normal view / 3D view
      </div>
      <div className={classes.popover}>
        <div>
          Click me man!
        </div>
      </div>
      <Gallery />
    </div>
  )
}

export default View