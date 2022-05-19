import React from 'react'

// ui
import { jss } from 'pixel-streaming'
// import Button from 'rsuite/Button'

// libs
import { usePlayer } from 'pixel-streaming'


const useStyles = jss({
  root: {

  },
})


export const DemoEvents: React.FC<any> = () => {
  const classes = useStyles()
  const player = usePlayer()


  return (
    <div>

      <div className={classes.root}>
        <h5>
          Events
        </h5>


      </div>
    </div>
  )
}