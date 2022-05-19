import * as React from 'react'

// ui
import { jss, media } from "pixel-streaming"

const Typography = () => {
  const list = {
    h1: {
      xs: 34,
      sm: 46,
      fontWeight: 600,
    },
    h2: {
      xs: 26,
      sm: 36,
      fontWeight: 600,
    },
    h3: {
      xs: 22,
      sm: 28,
      fontWeight: 600,
    },
    h4: {
      xs: 18,
      sm: 22,
      fontWeight: 600,
    },
    h5: {
      xs: 16,
      sm: 18,
      fontWeight: 600,
    },
    h6: {
      xs: 14,
      sm: 16,
      fontWeight: 700,
    },
    p: {
      xs: 15,
      sm: 18,
      fontWeight: 'auto',
    },

  }
  let res: any = {}
  for (let [key, value] of Object.entries(list)) {
    res[`& ${key}`] = {
      fontWeight: value.fontWeight,

      [media.down.sm]: {
        fontSize: value.xs,
        lineHeight: `${value.xs / .65}px`,
      },
      [media.up.sm]: {
        fontSize: value.sm,
        lineHeight: `${value.xs / .55}px`,
      }
    }
  }
  return res
}
const useStyles = jss({
  root: {
    [media.down.md]: {
      padding: '1rem',
    },
    [media.up.md]: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '3rem',
    },
    ...Typography(),
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

