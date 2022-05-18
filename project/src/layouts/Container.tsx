import * as React from 'react'

// ui
import { jss, media } from "pixel-streaming"

const useStyles = jss({
  root: {
    [media.down.md]: {
      padding: '2rem',
    },
    [media.up.md]: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '3rem',
    },
  },
})

interface Props {
  children: React.ReactNode
}
export const Container: React.FC<Props> = (props: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

